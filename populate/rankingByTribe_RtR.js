/*
 * Display tribes of all opponents
 */
const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const group_id = process.argv[2]

const userOfTribe = async () => {
  const querySnapshot = await db
    .collection('groups')
    .where('__name__', '==', group_id)
    .get()

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { members } = doc.data()

      const querySnapshotTribes = await db
        .collection('users')
        .where('__name__', 'in', Object.keys(members))
        .get()

      const tableUser = await Promise.all(
        querySnapshotTribes.docs.map(async (doc) => {
          const { displayName, score } = doc.data()
          return { displayName, score }
        }),
      )

      const arrayUser = tableUser.map((a) => [a.displayName, a.score])

      console.table(arrayUser)
    }),
  )
}

userOfTribe().then(() => process.exit(0))
