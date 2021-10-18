import { collection, doc } from '@firebase/firestore'
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from 'reactfire'

export const useStadiums = () => {
  const firestore = useFirestore()
  const stadiumsCollection = collection(firestore, 'stadiums')

  return useFirestoreCollectionData(stadiumsCollection, { initialData: [] })
    .data
}

export const useStadium = (id, initialData) => {
  const firestore = useFirestore()
  const stadiumsCollection = collection(firestore, 'stadiums')

  return useFirestoreDocData(doc(stadiumsCollection, id), {
    initialData,
  }).data
}
