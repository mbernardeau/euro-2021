import { useFirestoreDocData, useUser, useFirestore } from 'reactfire'
import { FieldValue, collection } from '@firebase/firestore'

export const useBet = (matchId) => {
  const {
    data: { uid },
  } = useUser()

  const firestore = useFirestore()
  const ref = collection(firestore, 'bets').doc(`${matchId}_${uid}`)

  const setBet = (bet) => {
    ref.set(
      {
        ...bet,
        matchId,
        uid,
        updatedAt: FieldValue.serverTimestamp(),
        version: FieldValue.increment(1),
      },
      { merge: true },
    )
  }

  return [useFirestoreDocData(ref).data, setBet]
}
