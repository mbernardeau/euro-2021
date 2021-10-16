import {
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollection,
} from 'reactfire'
import { collection, doc } from '@firebase/firestore'

export const useTeam = (id, initialData) => {
  const firestore = useFirestore()
  const collectionRef = collection(firestore, 'teams')
  const documentRef = doc(collectionRef, id)
  return useFirestoreDocData(documentRef, {
    initialData,
  }).data
}

export const useTeams = () => {
  const firestore = useFirestore()
  const query = collection(firestore, 'teams').orderBy('winOdd')

  return useFirestoreCollection(query, { initialData: [] }).data?.docs
}
