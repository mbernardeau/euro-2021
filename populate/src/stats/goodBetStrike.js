/*
 * Best bet strike for each user
 */
const { serviceAccount } = require('../chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const displayGoodBetStrike = async () => {
  const querySnapshotUser = await db
    .collection('opponents')
    .where('score', '>', 0)
    .get()

  const querySnapshotMatch = await db
    .collection('matches')
    .where('display', '==', true)
    .orderBy('dateTime', 'asc')
    .get()

  const table = await Promise.all(
    querySnapshotUser.docs.map(async (user) => {
      const { displayName, uid } = user.data()

      return await Promise.all(
        querySnapshotMatch.docs.map(async (doc) => {
          const matchId = doc.id

          const hasWonPoints = await betWithPoints(uid, matchId)

          return {
            displayName,
            hasWonPoints,
          }
        }),
      )
    }),
  )

  const output = table.map((user) => {
    let strike_max = 0
    let strike = 0
    user.forEach((a) => {
      if (a.hasWonPoints) {
        strike++
      } else {
        if (strike > strike_max) strike_max = strike
        strike = 0
      }
    })
    if (strike > strike_max) strike_max = strike
    const { displayName } = user[0]
    return { displayName, strike_max }
  })

  console.table(
    output.sort((a, b) => {
      return b.strike_max - a.strike_max
    }),
  )
}

/**
 * Prédicat *asynchrone* pour vérifier si un pari existe.
 * Note: Ici on vérifie que l'existence du document + le fait que les points gagnés soient supérieurs à 0.
 *
 * @param uid Identifiant de l'utilisateur
 * @param matchId Identifiant du match
 * @returns `true` si des points sont gagnés, `false` sinon
 */
async function betWithPoints(uid, matchId) {
  let isValid = false

  const betSnapshot = await db.collection('bets').doc(`${matchId}_${uid}`).get()

  if (betSnapshot.exists) {
    const { pointsWon } = betSnapshot.data()

    if (pointsWon > 0) isValid = true
  }

  return isValid
}

displayGoodBetStrike().then(() => process.exit(0))
