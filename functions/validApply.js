const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()

exports.validApply = functions
  .region('europe-west3')
  .https.onCall(async ({ groupId, userId }, { auth }) => {
    const isAdmin = (await db.collection('users').doc(auth.uid).get()).get(
      'admin',
    )

    if (!isAdmin) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'User must be an admin',
      )
    }

    const batch = db.batch()

    batch.update(db.collection('groupApply').doc(`${groupId}_${userId}`), {
      status: 'validated',
      validatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    batch.update(db.collection('groups').doc(groupId), {
      awaitingMembers: admin.firestore.FieldValue.arrayRemove(userId),
      members: admin.firestore.FieldValue.arrayUnion(userId),
    })

    return batch.commit()
  })
