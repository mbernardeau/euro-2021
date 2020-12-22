const admin = require('firebase-admin')

const serviceAccount = require('./road-to-russia-540bf-firebase-adminsdk-hip91-465a317cbd.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://road-to-russia-540bf.firebaseio.com',
})

const db = admin.firestore()

const round = (value, decimals) => Number(`${Math.round(`${value}e${decimals}`)}${`e-${decimals}`}`)

db.collection('users')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const { score, displayName } = doc.data()
      const { id } = doc

      return db
        .collection('bets')
        .where('userId', '==', id)
        .get()
        .then(betSnap => {
          let betScore = 0
          betSnap.forEach(betDoc => {
            const { pointsWon } = betDoc.data()
            if (!isNaN(pointsWon)) betScore += round(pointsWon, 2) // eslint-disable-line no-restricted-globals
          })
          if (Math.abs(score - betScore) > 0.01) {
            console.log(`User: ${displayName} ${score} ${round(betScore, 2)}`)
            // return db
            //   .collection('users')
            //   .doc(id)
            //   .update({
            //     score: round(betScore, 2),
            //   })
          }
        })
    })
  })
