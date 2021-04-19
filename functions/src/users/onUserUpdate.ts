import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { EU_WEST_3 } from '../constants'
import { UserProfile } from '../model'

const db = admin.firestore()

/**
 * On user profile updated, mirror changes to the opponents collection
 */
export const onUserUpdate = functions
  .region(EU_WEST_3)
  .firestore.document('users/{userId}')
  .onUpdate((change) => {
    const userProfile = change.after.data() as UserProfile

    return db
      .collection('opponents')
      .doc(userProfile.uid)
      .set(
        {
          uid: userProfile.uid,
          avatarUrl:
            userProfile.profile?.picture?.data?.url ?? userProfile.avatarUrl,
          displayName: userProfile.displayName,
          winnerTeam: userProfile.winnerTeam,
        },
        {
          merge: true,
        },
      )
  })
