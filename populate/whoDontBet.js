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
  const querySnapshot = await db.collection('matches').doc(matchId).get()

  const table = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { teamA, teamB } = doc.data()

      const { teamA, teamB } = (await db.collection('bets').get()).data()

      const { teamA, teamB } = doc.data()

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
        score,
        nameTeamB,
        scoreReel,
        pointsWon,
      }
    }),
  )

  console.table(table)
}

displayBets().then(() => process.exit(0))
