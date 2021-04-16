/*
 * Display bets of all opponents
 */
const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

db.collection('bets')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const { uid, matchId, pointsWon } = doc.data()
      let nameTeamA, nameTeamB, userName

      db.collection('matches')
        .doc(matchId)
        .get()
        .then((matchDoc) => {
          const { teamA, teamB } = matchDoc.data()
          db.collection('teams')
            .doc(teamA)
            .get()
            .then((teamDoc) => {
              nameTeamA = teamDoc.data().name
            })
          db.collection('teams')
            .doc(teamB)
            .get()
            .then((teamDoc) => {
              nameTeamB = teamDoc.data().name
            })
          db.collection('opponents')
            .doc(uid)
            .get()
            .then((userDoc) => {
              userName = userDoc.data().displayName
            })
        })
      console.log(userName.padEnd(20), nameTeamA, nameTeamB, pointsWon)
    })
  })
