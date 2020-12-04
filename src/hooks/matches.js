import { useFirestore, useFirestoreCollection } from 'reactfire'

export const useMatches = () => {
  const query = useFirestore().collection('matches')

  return useFirestoreCollection(query).data?.docs
}
