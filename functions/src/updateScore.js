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
  SCORE_PARFAIT: 1,
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

    // Get result
    const realResult = findResult(realScoreTeamA, realScoreTeamB)

    // Calculate category of match on goals scored
    const nbButs = realScoreTeamA + realScoreTeamB
    const catMatch =
      realResult !== 'N' && nbButs < 3
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
            const betResult = findResult(betTeamA, betTeamB)

            if (betTeamA === realScoreTeamA && betTeamB === realScoreTeamB) {
              // perfect match ! Full points
              console.log('HOLY SH*T YOU WIN, you guess perfectly the score !')
              promises.push(updateUserScore(oddScore, userId, oldBetScore))
              promises.push(updatePointsWon(oddScore, betId))
            } else if (realResult === betResult) {
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
                updateUserScore(oddScore, userId, oldBetScore, coeffProxi),
              )
              promises.push(updatePointsWon(oddScore, betId, coeffProxi))
            } else {
              console.log(
                "YOU LOSE SON, you didn't find the score neither the match issue",
              )
              promises.push(updateUserScore(oddScore, userId, oldBetScore, 0))
              promises.push(updatePointsWon(oddScore, betId, 0))
            }
          } else {
            console.log('Phase finale ', phase)

            // Get realWinner
            const realWinner = realResult === 'N' ? scores.winner : realResult

            if (!realWinner || (realWinner !== 'A' && realWinner !== 'B')) {
              console.log('No winner defined')
              return null
            }

            const phaseCoeff = getPhaseCoeff(phase)
            const betResult = findResult(betTeamA, betTeamB)
            const finalBetWinner = betResult === 'N' ? bet.betWinner : betResult
            const hasGoodResult = betResult === realResult
            const hasGoodWinner = finalBetWinner === realWinner

            if (!hasGoodResult && !hasGoodWinner) {
              console.log(
                "YOU LOSE SON, you didn't find the score neither the match issue",
              )
              promises.push(updateUserScore(oddScore, userId, oldBetScore, 0))
              promises.push(updatePointsWon(oddScore, betId, 0))
            } else {
              let nbButsEcart =
                Math.abs(realScoreTeamA - betTeamA) +
                Math.abs(realScoreTeamB - betTeamB)

              // Ajout des malus eventuels
              if (!hasGoodResult || !hasGoodWinner) nbButsEcart++

              const coeffProxi =
                nbButsEcart === 0
                  ? proxiCoeff.SCORE_PARFAIT
                  : nbButsEcart <= catMatch.proxi1
                  ? proxiCoeff.PROXI1
                  : nbButsEcart <= catMatch.proxi2
                  ? proxiCoeff.PROXI2
                  : proxiCoeff.PROXI3

              promises.push(
                updateUserScore(
                  oddScore,
                  userId,
                  oldBetScore,
                  coeffProxi,
                  phaseCoeff,
                ),
              )
              promises.push(
                updatePointsWon(oddScore, betId, coeffProxi, phaseCoeff),
              )
            }
          }
        })

        return Promise.all(promises)
      })
  })

const updateUserScore = (
  odd,
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

const updatePointsWon = (odd, id, coeffProxi = 1, coeffPhase = 1) => {
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

const findResult = (score1, score2) => {
  if (score1 > score2) return 'A'
  if (score1 === score2) return 'N'
  return 'B'
}

// https://docs.google.com/spreadsheets/d/1ZioOtyCblJtJf0WAaRxVWmnibqOeC7eDcJYDVEYRqng/edit?usp=sharing
const getPhaseCoeff = (phase) =>
  ({
    8: 1.67,
    4: 3.34,
    2: 6.69,
    1: 13.37,
  }[phase])
