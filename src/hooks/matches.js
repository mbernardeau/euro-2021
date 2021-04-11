import { useFirestore, useFirestoreCollection } from 'reactfire'

export const useMatches = () => {
  const query = useFirestore().collection('matches').orderBy('dateTime')

  return useFirestoreCollection(query).data?.docs
}
