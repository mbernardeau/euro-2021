const functions = require('firebase-functions')
const admin = require('firebase-admin')
const db = admin.firestore()

exports.applyInGroup = functions
  .region('europe-west3')
  .firestore.document('groupApply/{applyId}')
  .onCreate((snap) => {
    const { groupId, uid } = snap.data()

    const groupRef = db.collection('groups').doc(groupId)

    return db.runTransaction(async (t) => {
      const group = (await t.get(groupRef)).data()
      const payingGroup = group.price > 0

      const membersKey = payingGroup ? 'awaitingMembers' : 'members'

      t.update(groupRef, {
        [membersKey]: admin.firestore.FieldValue.arrayUnion(uid),
      })
      t.update(snap.ref, {
        status: payingGroup ? 'applied' : 'validated',
        appliedAt: admin.firestore.FieldValue.serverTimestamp(),
        validatedAt: payingGroup
          ? null
          : admin.firestore.FieldValue.serverTimestamp(),
      })
    })
  })
