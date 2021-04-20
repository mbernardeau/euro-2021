/*
 * Display which user didn't bet on which match
 */
const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const displayForgottenBets = async () => {
  const querySnapshotMatch = await db.collection('matches').get()
  const querySnapshotUser = await db.collection('opponents').get()

  const table = await Promise.all(
    querySnapshotMatch.docs.map(async (doc) => {
      const { teamA, teamB } = doc.data()
      const matchId = doc.id

      const { name: nameTeamA } = (
        await db.collection('teams').doc(teamA).get()
      ).data()

      const { name: nameTeamB } = (
        await db.collection('teams').doc(teamB).get()
      ).data()

      return await Promise.all(
        querySnapshotUser.docs.map(async (user) => {
          const { displayName, uid } = user.data()

          const exist = await betExists(uid, matchId)

          return {
            exist,
            displayName,
            nameTeamA,
            nameTeamB,
            matchId,
          }
        }),
      )
    }),
  )

  console.table(flatten(table).filter((a) => !a.exist))
}

/**
 * Prédicat *asynchrone* pour vérifier si un pari existe.
 * Note: Ici on ne vérifie que l'existence du document, pas sa validité.
 *
 * @param uid Identifiant de l'utilisateur
 * @param matchId Identifiant du match
 * @returns `true` si le document existe, `false` sinon
 */
async function betExists(uid, matchId) {
  const betSnapshot = await db.collection('bets').doc(`${matchId}_${uid}`).get()

  return betSnapshot.exists
}

/**
 * Flattens array a single level deep.
 * @param {Array} array Array of arrays
 *
 * @returns Flattened array
 */
function flatten(array) {
  return array.reduce((a, b) => a.concat(b), [])
}

displayForgottenBets().then(() => process.exit(0))
