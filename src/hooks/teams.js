import {
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollection,
} from 'reactfire'

export const useTeam = (id, initialData) => {
  const ref = useFirestore().collection('teams').doc(id)
  return useFirestoreDocData(ref, {
    initialData,
  })
}

export const useTeams = () => {
  const query = useFirestore().collection('teams')

  const querySnapshot = useFirestoreCollection(query, { initialData: [] })

  return querySnapshot.docs
}
