const functions = require('firebase-functions')
const admin = require('firebase-admin')

const db = admin.firestore()

exports.onUserCreate = functions
  .region('europe-west3')
  .firestore.document('users/{userId}')
  .onCreate((snap, context) => {
    const userProfile = snap.data()

    return db.collection('opponents').doc(userProfile.uid).create({
      score: 0,
      uid: userProfile.uid,
      avatarUrl: userProfile.avatarUrl,
      displayName: userProfile.displayName,
    })
  })

exports.onUserUpdate = functions
  .region('europe-west3')
  .firestore.document('users/{userId}')
  .onUpdate((change, context) => {
    const userProfile = change.after.data()

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
