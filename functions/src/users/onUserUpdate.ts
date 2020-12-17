import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserProfile } from '../types'

const db = admin.firestore()

/**
 * On user profile updated, mirror changes to the opponents collection
 */
export const onUserUpdate = functions
  .region('europe-west3')
  .firestore.document('users/{userId}')
  .onUpdate((change) => {
    const userProfile = change.after.data() as UserProfile

    return db.collection('opponents').doc(userProfile.uid).set(
      {
        uid: userProfile.uid,
        avatarUrl: userProfile.avatarUrl,
        displayName: userProfile.displayName,
      },
      {
        merge: true,
      },
    )
  })
