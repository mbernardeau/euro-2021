import { useUser, useFirestore, useFirestoreDocData } from 'reactfire'
import { useIsUserConnected } from './user'

export const useWinnerTeam = () => {
  const firestore = useFirestore()
  const { uid } = useUser().data ?? {}
  const userRef = firestore
    .collection('opponents')
    .doc(useIsUserConnected() ? uid : ' ')

  return useFirestoreDocData(userRef).data
}
