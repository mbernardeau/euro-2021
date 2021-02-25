const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { EU_WEST_3 } = require('./constants')

const db = admin.firestore()

const round = (value, decimals) =>
  Number(`${Math.round(`${value}e${decimals}`)}${`e-${decimals}`}`)

exports.updateScore = functions
  .region(EU_WEST_3)
  .firestore.document('matches/{matchId}')
  .onUpdate((change) => {
    // Get final scores
    // odds: {1, 2, A, B, N}
    // scores: {A, B, winner}
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

    // Get odd
    const oddScore =
      realScoreTeamA + realScoreTeamB < 7
        ? odds[`P${realScoreTeamA}${realScoreTeamB}`]
        : odds.Pautre

    // Get winner
    const winner =
      scores.winner === undefined
        ? findWinner(realScoreTeamA, realScoreTeamB)
        : scores.winner

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
              // perfect match ! Four times team's odd
              console.log('HOLY SH*T YOU WIN, you guess perfectly the score !')
              promises.push(
                updateUserScore(
                  odds,
                  oddScore,
                  betWinner,
                  userId,
                  oldBetScore,
                  4,
                ),
              )
              promises.push(
                updatePointsWon(odds, oddScore, betWinner, betId, 4),
              )
            } else if (winner === betWinner) {
              // good result ! Two times team's odd
              console.log('You only guess the issue of the match (sucker)')
              promises.push(
                updateUserScore(
                  odds,
                  oddScore,
                  betWinner,
                  userId,
                  oldBetScore,
                  2,
                ),
              )
              promises.push(
                updatePointsWon(odds, oddScore, betWinner, betId, 2),
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
  coeff,
  coeffVainqueur = 0,
) => {
  const oddWinner = findCoteFinalWinner(odds, finalWinner) || 0

  console.log(`Updating user score for ${userId}`)
  const user = db.collection('opponents').doc(userId)

  return db
    .runTransaction((t) =>
      t.get(user).then((snapshot) => {
        const oldScore = snapshot.data().score || 0
        const newScore = round(
          oldScore - oldBetScore + coeff * odd + coeffVainqueur * oddWinner,
          2,
        )
        console.log(
          `User score update ${userId} (${oldScore} - ${oldBetScore} + ${coeff} * ${odd} + ${coeffVainqueur} * ${oddWinner} = ${newScore})`,
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
  coeff,
  coeffVainqueur = 0,
) => {
  const oddWinner = findCoteFinalWinner(odds, finalWinner) || 0

  console.log(`Updating points won for bet ${id}`)
  const bets = db.collection('bets').doc(id)

  return db
    .runTransaction((t) =>
      t.get(bets).then((betSnap) =>
        t.update(betSnap.ref, {
          pointsWon: round(coeff * odd + coeffVainqueur * oddWinner, 2),
        }),
      ),
    )
    .then(() =>
      console.log(
        `Bet ${id} update with ${round(
          coeff * odd + coeffVainqueur * oddWinner,
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

const findCoteFinalWinner = (odds, winner) => {
  // todo - To code
  return undefined
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
