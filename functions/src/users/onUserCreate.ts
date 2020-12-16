import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserProfile } from '../types'

const db = admin.firestore()

/**
 * On user profile created, create a corresponding entity in `opponents collection`
 */
export const onUserCreate = functions
  .region('europe-west3')
  .firestore.document('users/{userId}')
  .onCreate((snap) => {
    const userProfile = snap.data() as UserProfile

    return db.collection('opponents').doc(userProfile.uid).create({
      score: 0,
      uid: userProfile.uid,
      avatarUrl: userProfile.avatarUrl,
      displayName: userProfile.displayName,
    })
  })
