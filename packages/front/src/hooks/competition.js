import { useFirestore, useFirestoreDocData } from 'reactfire'

export const useCompetitionStartDate = () => {
  const ref = useFirestore()
    .collection('competitions')
    .doc('1BWoxRomTm3aaJFqRVHV')

  return useFirestoreDocData(ref).data
}
