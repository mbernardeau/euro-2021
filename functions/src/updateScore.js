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

// Proxi informations
const proxiInfos = {
  SCORE_PARFAIT: { proxiCoeff: 1, proxiLevel: 0 },
  PROXI1: { proxiCoeff: 0.6, proxiLevel: 1 },
  PROXI2: { proxiCoeff: 0.35, proxiLevel: 2 },
  PROXI3: { proxiCoeff: 0.1, proxiLevel: 3 },
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

          const betResult = findResult(betTeamA, betTeamB)

          const hasGoodResult = betResult === realResult
          let hasGoodWinner = true // Default for group match

          if (!phase || phase === '0') {
            console.log('Match de phase de poule')
          } else {
            console.log('Phase finale ', phase)

            // Get realWinner
            const realWinner = realResult === 'N' ? scores.winner : realResult

            if (!realWinner || (realWinner !== 'A' && realWinner !== 'B')) {
              console.log('No winner defined')
              return null
            }

            const finalBetWinner = betResult === 'N' ? bet.betWinner : betResult

            hasGoodWinner = finalBetWinner === realWinner
          }

          if (!hasGoodWinner && !hasGoodResult) {
            console.log(
              "YOU LOSE SON, you didn't find the score neither the match issue",
            )
            promises.push(updateUserScore(oddScore, userId, oldBetScore))
            promises.push(updatePointsWon(oddScore, betId))
          } else {
            let nbButsEcart =
              Math.abs(realScoreTeamA - betTeamA) +
              Math.abs(realScoreTeamB - betTeamB)

            // Ajout des malus eventuels (ne fait rien en cas de match de poule)
            if (!hasGoodWinner || !hasGoodResult) nbButsEcart++

            const proxiInfo =
              nbButsEcart === 0
                ? proxiInfos.SCORE_PARFAIT
                : nbButsEcart <= catMatch.proxi1
                ? proxiInfos.PROXI1
                : nbButsEcart <= catMatch.proxi2
                ? proxiInfos.PROXI2
                : proxiInfos.PROXI3

            promises.push(
              updateUserScore(
                oddScore,
                userId,
                oldBetScore,
                proxiInfo.proxiCoeff,
              ),
            )
            promises.push(
              updatePointsWon(
                oddScore,
                betId,
                proxiInfo.proxiCoeff,
                proxiInfo.proxiLevel,
              ),
            )
          }
        })

        return Promise.all(promises)
      })
  })

const updateUserScore = (odd, userId, oldBetScore = 0, coeffProxi = 0) => {
  console.log(`Updating user score for ${userId}`)
  const user = db.collection('opponents').doc(userId)

  return db
    .runTransaction((t) =>
      t.get(user).then((snapshot) => {
        const oldScore = snapshot.data().score || 0
        const newScore = oldScore - oldBetScore + round(coeffProxi * odd, 2)
        console.log(
          `User score update ${userId} (${oldScore} - ${oldBetScore} + ${coeffProxi} * ${odd} = ${newScore})`,
        )
        return t.update(user, { score: newScore })
      }),
    )
    .then(() => console.log(`User score updated for ${userId}`))
    .catch((err) => console.error(`User ${userId} score update failure:`, err))
}

const updatePointsWon = (odd, id, coeffProxi = 0, proxiLevel = null) => {
  console.log(`Updating points won for bet ${id}`)
  const bets = db.collection('bets').doc(id)

  return db
    .runTransaction((t) =>
      t.get(bets).then((betSnap) =>
        t.update(betSnap.ref, {
          pointsWon: round(coeffProxi * odd, 2),
          proxi: proxiLevel,
        }),
      ),
    )
    .then(() =>
      console.log(
        `Bet ${id} update with ${round(
          coeffProxi * odd,
          2,
        )} points. Proxi ${proxiLevel}`,
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
