import { useFirestoreDocData, useUser, useFirestore } from 'reactfire'

export const useBet = (matchId) => {
  const { uid } = useUser()

  const firestore = useFirestore()
  const FieldValue = useFirestore.FieldValue
  const ref = firestore.collection('bets').doc(`${matchId}_${uid}`)

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

  return [useFirestoreDocData(ref), setBet]
}
