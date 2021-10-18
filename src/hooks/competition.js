import { collection, doc } from '@firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'

export const useCompetitionData = () => {
  const firestore = useFirestore()
  const competitionsRef = collection(firestore, 'competitions')
  const documentRef = doc(competitionsRef, '1BWoxRomTm3aaJFqRVHV')

  return useFirestoreDocData(documentRef).data
}
