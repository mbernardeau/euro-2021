/*
 * Display tribes of all opponents
 */
const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const userOfTribe = async () => {
  const querySnapshot = await db.collection('groups').get()

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { members } = doc.data()

      const userSnapshots = await Promise.all(
        Object.keys(members).map((uid) =>
          db.collection('opponents').doc(uid).get(),
        ),
      )
      const users = userSnapshots.map((snap) => {
        const { displayName, score } = snap.data()
        return { displayName, score }
      })

      console.table(users.sort((a, b) => b.score - a.score))
    }),
  )
}

userOfTribe().then(() => process.exit(0))
