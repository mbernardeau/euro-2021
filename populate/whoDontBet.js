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
  const querySnapshot = await db.collection('matches').get()

  const table = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const querySnapshotUser = await db.collection('opponents').get()
      const { teamA, teamB } = doc.data()
      const matchId = doc.id

      const { name: nameTeamA } = (
        await db.collection('teams').doc(teamA).get()
      ).data()

      const { name: nameTeamB } = (
        await db.collection('teams').doc(teamB).get()
      ).data()

      return await Promise.all(
        querySnapshotUser.docs.map(async (doc) => {
          const { displayName, uid } = doc.data()

          const exist = true

          // await db
          //   .collection('bets')
          //   .where('matchId', '==', matchId)
          //   .where('uid', '==', uid)
          //   .get()

          return {
            exist,
            displayName,
            nameTeamA,
            nameTeamB,
            matchId,
          }
        }),
      )

      // if (!exist) {
      // return {
      //   betTable,
      // }
      // }
    }),
  )

  console.table(table)
}

displayForgottenBets().then(() => process.exit(0))
