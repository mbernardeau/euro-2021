/*
 * Display tribes of all opponents
 */
const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const rankingGlobal = async () => {
  const querySnapshot = await db
    .collection('users')
    .where('score', '!=', null)
    .get()

  const users = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { displayName, score } = doc.data()
      return { displayName, score }
    }),
  )
  console.table(users.sort((a, b) => b.score - a.score))
}

rankingGlobal().then(() => process.exit(0))
