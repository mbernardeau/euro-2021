import { collection, doc, orderBy, query } from '@firebase/firestore'
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreDocData,
} from 'reactfire'

export const useTeam = (id) => {
  const firestore = useFirestore()
  const collectionRef = collection(firestore, 'teams')
  const documentRef = doc(collectionRef, id)

  return useFirestoreDocData(documentRef).data
}

export const useTeams = () => {
  const firestore = useFirestore()
  const teamsQuery = query(collection(firestore, 'teams'), orderBy('winOdd'))

  return useFirestoreCollection(teamsQuery).data?.docs
}
