import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreDocData,
} from 'reactfire'

export const useStadiums = () => {
  const query = useFirestore().collection('stadiums')

  return useFirestoreCollection(query, { initialData: [] }).data?.docs
}

export const useStadium = (id, initialData) => {
  const ref = useFirestore().collection('stadiums').doc(id)
  return useFirestoreDocData(ref, {
    initialData,
  }).data
}
