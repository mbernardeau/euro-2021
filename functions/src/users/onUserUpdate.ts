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
    const uid = change.after.id
    const userProfile = change.after.data() as UserProfile

    return db
      .collection('opponents')
      .doc(uid)
      .set(
        {
          uid,
          avatarUrl:
            (userProfile.profile?.picture?.data?.url ??
              userProfile.avatarUrl) ||
            null,
          displayName: userProfile.displayName,
          winnerTeam: userProfile.winnerTeam ?? null,
        },
        {
          merge: true,
        },
      )
  })
