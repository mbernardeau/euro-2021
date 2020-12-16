import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserProfile, ValidApplyParams } from '../types'

const db = admin.firestore()

export const validApply = functions
  .region('europe-west3')
  .https.onCall(async ({ groupId, userId }: ValidApplyParams, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated',
      )
    }

    const user = (
      await db.collection('users').doc(auth.uid).get()
    ).data() as UserProfile
    const isAdmin = user.admin

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
