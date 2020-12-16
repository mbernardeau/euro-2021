const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()

const isPayingGroup = async (groupRef) => {
  const group = (await groupRef.get()).data()
  return group.price > 0
}

exports.applyInGroup = functions
  .region('europe-west3')
  .firestore.document('groupApply/{applyId}')
  .onCreate(async (groupApplySnapshot) => {
    const { groupId, uid } = groupApplySnapshot.data()

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
