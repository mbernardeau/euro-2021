import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreDocData,
} from 'reactfire'

export const useStadiums = () => {
  const query = useFirestore().collection('stadiums')

  const querySnapshot = useFirestoreCollection(query, { initialData: [] })

  return querySnapshot.docs
}

export const useStadium = (id, initialData) => {
  const ref = useFirestore().collection('stadiums').doc(id)
  return useFirestoreDocData(ref, {
    initialData,
  })
}
