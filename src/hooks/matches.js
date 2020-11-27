import { useFirestore, useFirestoreCollection } from 'reactfire'

export const useMatches = () => {
  const query = useFirestore().collection('matches')

  const querySnapshot = useFirestoreCollection(query)

  return querySnapshot.docs
}
