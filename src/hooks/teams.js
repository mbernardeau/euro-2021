import {
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollection,
} from 'reactfire'

export const useTeam = (id, initialData) => {
  const ref = useFirestore().collection('teams').doc(id)
  return useFirestoreDocData(ref, {
    initialData,
  }).data
}

export const useTeams = () => {
  const query = useFirestore().collection('teams')

  return useFirestoreCollection(query, { initialData: [] }).data?.docs
}
