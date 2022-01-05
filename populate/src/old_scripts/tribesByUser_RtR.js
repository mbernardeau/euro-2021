/*
 * Display tribes of all opponents
 */
const { serviceAccount } = require('./chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const displayBets = async () => {
  const querySnapshot = await db.collection('users').get()

  const table = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { uid, displayName } = doc.data()

      const querySnapshotTribes = await db
        .collection('groups')
        .where(`members.${doc.id}`, '==', true)
        .get()

      const tableTribes = await Promise.all(
        querySnapshotTribes.docs.map(async (doc) => {
          const { name } = doc.data()
          return { name }
        }),
      )

      const arrayTribes = tableTribes.map((a) => a.name)

      return {
        displayName,
        uid: doc.id,
        ...arrayTribes,
      }
    }),
  )

  console.table(table)
}

displayBets().then(() => process.exit(0))
