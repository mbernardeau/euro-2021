const admin = require('firebase-admin')

const serviceAccount = require('./road-to-russia-540bf-firebase-adminsdk-hip91-465a317cbd.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://road-to-russia-540bf.firebaseio.com',
})

const db = admin.firestore()

db.collection('bets')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const { updatedAt, userId, matchId, pointsWon } = doc.data()
      if (!updatedAt) return

      db.collection('matches')
        .doc(matchId)
        .get()
        .then(matchDoc => {
          const { dateTime } = matchDoc.data()
          if (updatedAt > dateTime) {
            db.collection('users')
              .doc(userId)
              .get()
              .then(userDoc => {
                const { displayName } = userDoc.data()
                const diff = Math.round((updatedAt - dateTime) / 60000)
                console.log(
                  userId,
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
