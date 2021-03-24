import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { EU_WEST_3 } from '../constants'
import { UserIdToken, UserRole, ValidApplyParams } from '../model'

const db = admin.firestore()

export const validApply = functions
  .region(EU_WEST_3)
  .https.onCall(async ({ groupId, userId }: ValidApplyParams, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated',
      )
    }

    const isAdmin = (auth.token as UserIdToken).role === UserRole.admin

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
