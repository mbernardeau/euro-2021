import {
  collection,
  increment,
  serverTimestamp,
  doc,
  setDoc,
} from '@firebase/firestore'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'

const initialData = {}

export const useBet = (matchId) => {
  const {
    data: { uid },
  } = useUser()

  const firestore = useFirestore()
  const betsCollection = collection(firestore, 'bets')
  const documentRef = doc(betsCollection, `${matchId}_${uid}`)

  const setBet = (bet) => {
    setDoc(
      documentRef,
      {
        ...bet,
        matchId,
        uid,
        updatedAt: serverTimestamp(),
        version: increment(1),
      },
      { merge: true },
    )
  }

  return [useFirestoreDocData(documentRef).data ?? initialData, setBet]
}
