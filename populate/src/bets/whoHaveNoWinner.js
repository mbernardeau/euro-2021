/*
 * Display which user has no winnerTeam
 */
const { serviceAccount } = require('../chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const displayForgottenBets = async () => {
  const querySnapshot = await db
    .collection('opponents')
    .where('winnerTeam', '==', null)
    .get()

  const result = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { displayName, uid } = doc.data()
      return { displayName, uid }
    }),
  )
  console.table(result)
}

displayForgottenBets().then(() => process.exit(0))
