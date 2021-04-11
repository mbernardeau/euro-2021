import { useFirestore, useFirestoreCollection } from 'reactfire'

export const useMatches = () => {
  const query = useFirestore().collection('matches').orderBy('dateTime', 'asc')

  return useFirestoreCollection(query).data?.docs
}
