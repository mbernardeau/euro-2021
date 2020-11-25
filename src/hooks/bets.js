import { useFirestore } from 'react-redux-firebase'
import { useFirestoreDocData, useUser } from 'reactfire'

export const useBet = (matchId) => {
  const { uid } = useUser()
  console.log(uid)
  const firestore = useFirestore()
  const ref = firestore.collection('bets').doc(`${matchId}_${uid}`)

  const setBet = (bet) => {
    ref.set(
      {
        ...bet,
        matchId,
        uid,
        updatedAt: firestore.FieldValue.serverTimestamp(),
        version: firestore.FieldValue.increment(1),
      },
      { merge: true },
    )
  }

  return [useFirestoreDocData(ref), setBet]
}
