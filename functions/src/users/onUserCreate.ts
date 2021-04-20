import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { EU_WEST_3 } from '../constants'
import { UserProfile } from '../model'

const db = admin.firestore()

/**
 * On user profile created, create a corresponding entity in `opponents collection`
 */
export const onUserCreate = functions
  .region(EU_WEST_3)
  .firestore.document('users/{userId}')
  .onCreate((snap) => {
    const userProfile = snap.data() as UserProfile

    return db
      .collection('opponents')
      .doc(userProfile.uid)
      .create({
        score: 0,
        uid: userProfile.uid,
        avatarUrl:
          userProfile.profile?.picture?.data?.url ?? userProfile.avatarUrl,
        displayName: userProfile.displayName,
        winnerTeam: null,
      })
  })
