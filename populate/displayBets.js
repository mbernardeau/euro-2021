/*
 * Display bets of all opponents
 */
const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const displayBets = async () => {
  const querySnapshot = await db.collection('bets').get()

  const table = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { uid, matchId, pointsWon } = doc.data()

      const { teamA, teamB } = (
        await db.collection('matches').doc(matchId).get()
      ).data()
      const { name: nameTeamA } = (
        await db.collection('teams').doc(teamA).get()
      ).data()
      const { name: nameTeamB } = (
        await db.collection('teams').doc(teamB).get()
      ).data()
      const { displayName: userName } = (
        await db.collection('opponents').doc(uid).get()
      ).data()

      return {
        userName,
        nameTeamA,
        nameTeamB,
        pointsWon,
      }
    }),
  )

  console.table(table)
}

displayBets().then(() => process.exit(0))
