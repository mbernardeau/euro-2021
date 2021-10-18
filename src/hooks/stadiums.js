import { collection, doc } from '@firebase/firestore'
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreDocData,
} from 'reactfire'

export const useStadiums = () => {
  const firestore = useFirestore()
  const stadiumsCollection = collection(firestore, 'stadiums')

  return useFirestoreCollection(stadiumsCollection).data?.docs
}

export const useStadium = (id) => {
  const firestore = useFirestore()
  const stadiumsCollection = collection(firestore, 'stadiums')

  return useFirestoreDocData(doc(stadiumsCollection, id)).data
}
