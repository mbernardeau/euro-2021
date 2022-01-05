/*
 * Display user with no tribe
 */
const { serviceAccount } = require('../chooseDatabase.js')

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const displayBets = async () => {
  const querySnapshot = await db.collection('opponents').get()

  const table = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { uid, displayName } = doc.data()

      const querySnapshotNotifications = await db
        .collection('notificationSubscriptions')
        .where('uid', '==', uid)
        .get()

      const tableNotifications = await Promise.all(
        querySnapshotNotifications.docs.map(async (doc) => {
          const { PREMATCH } = doc.data()
          return { PREMATCH }
        }),
      )

      // TODO - Récupérer le nombre de notifications si plusieurs
      const arrayNotifications = tableNotifications.map((a) => a.PREMATCH)

      return {
        displayName,
        uid,
        ...arrayNotifications,
      }
    }),
  )

  // Rajouter .filter((a) => !a[0]) pour avoir ceux qui n'en ont pas
  console.table(table)
}

displayBets().then(() => process.exit(0))
