const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { EU_WEST_3 } = require('./constants')

const db = admin.firestore()

// Category of game to calculate proximity
const category = {
  CAT1: { proxi1: 0, proxi2: 1, proxi3: 2 },
  CAT2: { proxi1: 1, proxi2: 2, proxi3: 3 },
  CAT3: { proxi1: 2, proxi2: 3, proxi3: 4 },
}

// Proxi points
const proxiCoeff = {
  PROXI1: 0.6,
  PROXI2: 0.35,
  PROXI3: 0.2,
}

const round = (value, decimals) =>
  Number(`${Math.round(`${value}e${decimals}`)}${`e-${decimals}`}`)

exports.updateScore = functions
  .region(EU_WEST_3)
  .firestore.document('matches/{matchId}')
  .onUpdate((change) => {
    // Get final scores
    // odds: {P00, ..., P60, Pautre}
    // scores: {A, B, (winner)}
    const { odds, scores, phase } = change.after.data()
    if (
      scores === undefined ||
      scores.A === undefined ||
      scores.B === undefined
    ) {
      console.log('No scores defined (sorry not sorry)')
      return null
    }

    // Get scores
    const realScoreTeamA = scores.A
    const realScoreTeamB = scores.B

    // Get winner
    const winner =
      scores.winner === undefined
        ? findWinner(realScoreTeamA, realScoreTeamB)
        : scores.winner

    // Calculate category of match on goals scored
    const nbButs = realScoreTeamA + realScoreTeamB
    const catMatch =
      winner !== 'N' && nbButs < 3
        ? category.CAT1
        : nbButs < 6
        ? category.CAT2
        : category.CAT3

    // Get odd
    const oddScore =
      nbButs < 7 ? odds[`P${realScoreTeamA}${realScoreTeamB}`] : odds.Pautre

    // Get bets
    const bets = db.collection('bets')
    return bets
      .where('matchId', '==', change.after.ref.id)
      .get()
      .then((datas) => {
        const promises = []

        datas.forEach((doc) => {
          // Get a bet
          const bet = doc.data()
          const { betTeamA, betTeamB, uid: userId } = bet
          const betId = doc.id
          const oldBetScore = bet.pointsWon

          if (!phase || phase === '0') {
            console.log('Match de phase de poule')
            const betWinner = findWinner(betTeamA, betTeamB)
            console.log(betWinner)

            if (betTeamA === realScoreTeamA && betTeamB === realScoreTeamB) {
              // perfect match ! Full points
              console.log('HOLY SH*T YOU WIN, you guess perfectly the score !')
              promises.push(
                updateUserScore(odds, oddScore, betWinner, userId, oldBetScore),
              )
              promises.push(updatePointsWon(odds, oddScore, betWinner, betId))
            } else if (winner === betWinner) {
              // good result ! We calculate proxi
              console.log('You only guess the issue of the match (sucker)')

              const nbButsEcart = Math.abs(nbButs - betTeamA - betTeamB)
              const coeffProxi =
                nbButsEcart <= catMatch.proxi1
                  ? proxiCoeff.PROXI1
                  : nbButsEcart <= catMatch.proxi2
                  ? proxiCoeff.PROXI2
                  : proxiCoeff.PROXI3

              promises.push(
                updateUserScore(
                  odds,
                  oddScore,
                  betWinner,
                  userId,
                  oldBetScore,
                  coeffProxi,
                ),
              )
              promises.push(
                updatePointsWon(odds, oddScore, betWinner, betId, coeffProxi),
              )
            } else {
              console.log(
                "YOU LOSE SON, you didn't find the score neither the match issue",
              )
              promises.push(
                updateUserScore(
                  odds,
                  oddScore,
                  betWinner,
                  userId,
                  oldBetScore,
                  0,
                ),
              )
              promises.push(
                updatePointsWon(odds, oddScore, betWinner, betId, 0),
              )
            }
          } else {
            console.log('Phase finale ', phase)
            const betWinner = findWinner(betTeamA, betTeamB)
            const finalBetWinner = betWinner === 'N' ? bet.betWinner : betWinner

            const phaseCoeff = getPhaseCoeff(phase)

            const hasGoodWinner =
              betWinner === findWinner(realScoreTeamA, realScoreTeamB)
            const hasGoodScore =
              betTeamA === realScoreTeamA && betTeamB === realScoreTeamB
            const bonVainqueurFinalCoeff =
              finalBetWinner === winner ? phaseCoeff.bonVainqueurFinal : 0

            let phaseVainqueurCoeff = 0

            if (hasGoodScore) phaseVainqueurCoeff = phaseCoeff.bonScore
            else if (hasGoodWinner)
              phaseVainqueurCoeff = phaseCoeff.bonVainqueur

            promises.push(
              updateUserScore(
                odds,
                oddScore,
                finalBetWinner,
                userId,
                oldBetScore,
                phaseVainqueurCoeff,
                bonVainqueurFinalCoeff,
              ),
            )
            promises.push(
              updatePointsWon(
                odds,
                oddScore,
                finalBetWinner,
                betId,
                phaseVainqueurCoeff,
                bonVainqueurFinalCoeff,
              ),
            )
          }
        })

        return Promise.all(promises)
      })
  })

const updateUserScore = (
  odds,
  odd,
  finalWinner,
  userId,
  oldBetScore = 0,
  coeffProxi = 1,
  coeffPhase = 1,
) => {
  console.log(`Updating user score for ${userId}`)
  const user = db.collection('opponents').doc(userId)

  return db
    .runTransaction((t) =>
      t.get(user).then((snapshot) => {
        const oldScore = snapshot.data().score || 0
        const newScore = round(
          oldScore - oldBetScore + coeffProxi * odd * coeffPhase,
          2,
        )
        console.log(
          `User score update ${userId} (${oldScore} - ${oldBetScore} + ${coeffProxi} * ${odd} * ${coeffPhase} = ${newScore})`,
        )
        return t.update(user, { score: newScore })
      }),
    )
    .then(() => console.log(`User score updated for ${userId}`))
    .catch((err) => console.error(`User ${userId} score update failure:`, err))
}

const updatePointsWon = (
  odds,
  odd,
  finalWinner,
  id,
  coeffProxi = 1,
  coeffPhase = 1,
) => {
  console.log(`Updating points won for bet ${id}`)
  const bets = db.collection('bets').doc(id)

  return db
    .runTransaction((t) =>
      t.get(bets).then((betSnap) =>
        t.update(betSnap.ref, {
          pointsWon: round(coeffProxi * odd * coeffPhase, 2),
        }),
      ),
    )
    .then(() =>
      console.log(
        `Bet ${id} update with ${round(
          coeffProxi * odd * coeffPhase,
          2,
        )} points`,
      ),
    )
    .catch((err) => {
      console.error(`Bet ${id} update failure:`, err)
    })
}

const findWinner = (score1, score2) => {
  if (score1 > score2) return 'A'
  if (score1 === score2) return 'N'
  return 'B'
}

const getPhaseCoeff = (phase) =>
  ({
    8: {
      bonScore: 5,
      bonVainqueur: 2,
      bonVainqueurFinal: 2,
    },
    4: {
      bonScore: 8,
      bonVainqueur: 3,
      bonVainqueurFinal: 3,
    },
    2: {
      bonScore: 13,
      bonVainqueur: 5,
      bonVainqueurFinal: 5,
    },
    3: {
      bonScore: 15,
      bonVainqueur: 6,
      bonVainqueurFinal: 6,
    },
    1: {
      bonScore: 22,
      bonVainqueur: 8,
      bonVainqueurFinal: 8,
    },
  }[phase])
