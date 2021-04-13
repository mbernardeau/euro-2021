/*
 * Check if someone bet after the beginning of a game
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
      const { updatedAt, uid, matchId, pointsWon } = doc.data()
      if (!updatedAt) return

      db.collection('matches')
        .doc(matchId)
        .get()
        .then((matchDoc) => {
          const { dateTime } = matchDoc.data()
          if (updatedAt > dateTime) {
            db.collection('opponents')
              .doc(uid)
              .get()
              .then((userDoc) => {
                const { displayName } = userDoc.data()
                const diff = Math.round((updatedAt - dateTime) / 60000)
                console.log(
                  uid,
                  pointsWon,
                  matchId,
                  updatedAt,
                  dateTime,
                  `+${diff} minutes`,
                  displayName,
                )
              })
          }
        })
    })
  })
