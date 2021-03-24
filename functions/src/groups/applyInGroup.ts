import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { EU_WEST_3 } from '../constants'
import { Group, GroupApply } from '../model'

const db = admin.firestore()

const isPayingGroup = async (
  groupRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
) => {
  const groupSnapshot = await groupRef.get()
  if (!groupSnapshot.exists) {
    throw new Error(`Group with id ${groupRef.id} does not exist`)
  }
  const group = groupSnapshot.data() as Group
  return group.price > 0
}

export const applyInGroup = functions
  .region(EU_WEST_3)
  .firestore.document('groupApply/{applyId}')
  .onCreate(async (groupApplySnapshot) => {
    const { groupId, uid } = groupApplySnapshot.data() as GroupApply

    const groupRef = db.collection('groups').doc(groupId)
    const payingGroup = await isPayingGroup(groupRef)

    const membersKey = payingGroup ? 'awaitingMembers' : 'members'

    const batch = db.batch()
    batch.update(groupRef, {
      [membersKey]: admin.firestore.FieldValue.arrayUnion(uid),
    })
    batch.update(groupApplySnapshot.ref, {
      status: payingGroup ? 'applied' : 'validated',
      appliedAt: admin.firestore.FieldValue.serverTimestamp(),
      validatedAt: payingGroup
        ? null
        : admin.firestore.FieldValue.serverTimestamp(),
    })

    return batch.commit()
  })
