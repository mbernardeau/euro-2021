import { useFirestore, useFirestoreCollection } from 'reactfire'
import { collection, orderBy, query } from '@firebase/firestore'

export const useMatches = () => {
  const firestore = useFirestore()
  const matches = collection(firestore, 'matches')
  const matchesQuery = query(matches, orderBy('dateTime', 'asc'))

  return useFirestoreCollection(matchesQuery).data?.docs
}
