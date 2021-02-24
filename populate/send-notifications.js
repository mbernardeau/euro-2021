/**
 * Script to test notifications in app.
 */
const admin = require('firebase-admin')
const serviceAccount = require('./euro2021-3d006-firebase-adminsdk-swizj.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

/**
 * Gather all currently active notification subscriptions
 *
 * @returns {FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]} Array of firebase snapshots
 */
async function getNotificationSubscription() {
  const snapshots = await admin
    .firestore()
    .collection('notificationSubscriptions')
    .get()

  return snapshots.docs
}

const data = {
  title: 'Test notification',
  body: 'Ceci est un test pour euro-2021',
  url: '/matches',
}

const invalidTokenErrorCodes = [
  'messaging/registration-token-not-registered',
  'messaging/invalid-argument',
]

/**
 * Send messages to all valid subscriptors
 *
 * @param {FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]} notificationSubscriptionsSnapshots Array of firebase snapshots
 */
async function sendMessages(notificationSubscriptionsSnapshots) {
  const tokens = notificationSubscriptionsSnapshots.map((snap) =>
    snap.get('token'),
  )

  const response = await admin.messaging().sendMulticast({
    data,
    tokens,
  })

  console.log(`${response.successCount} notifications sent`)

  await removeInvalidTokens(response, notificationSubscriptionsSnapshots)
}

/**
 * Cleanup database by removing invalid tokens
 * @param {admin.messaging.BatchResponse} response Response of batched sent notification
 * @param {FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]} notificationSubscriptionsSnapshots Array of firebase snapshots
 */
async function removeInvalidTokens(
  response,
  notificationSubscriptionsSnapshots,
) {
  if (response.failureCount > 0) {
    const invalidSubscriptions = response.responses
      .map(({ success, error }, index) => {
        if (!success && invalidTokenErrorCodes.includes(error.code)) {
          return index
        }
        return null
      })
      .filter((index) => index !== null)
      .map((index) => notificationSubscriptionsSnapshots[index])
      .map((snap) => snap.ref)

    if (invalidSubscriptions.length) {
      const batch = admin.firestore().batch()

      invalidSubscriptions.forEach((ref) => batch.delete(ref))

      await batch.commit()

      console.log(`${invalidSubscriptions.length} subscriptions deleted`)
    }
  }
}

getNotificationSubscription()
  .then(sendMessages)
  .then(() => process.exit(0))
