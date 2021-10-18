import { useCallback } from 'react'
import { useUserProfile } from './user'
import { useFirestore } from 'reactfire'
import { useSnackbar } from 'notistack'
import { collection, updateDoc, doc } from '@firebase/firestore'

export const useSelectedWinner = () => {
  const { uid, winnerTeam } = useUserProfile()
  const firestore = useFirestore()
  const { enqueueSnackbar } = useSnackbar()
  const collectionRef = collection(firestore, 'users')

  const updater = useCallback(
    async (team) => {
      const documentRef = doc(collectionRef, uid)
      try {
        await updateDoc(documentRef, {
          winnerTeam: team,
        })
        return enqueueSnackbar('Équipe mise à jour', { variant: 'success' })
      } catch (e) {
        return enqueueSnackbar('Mise à jour échouée :(', { variant: 'error' })
      }
    },
    [collectionRef, uid, enqueueSnackbar],
  )

  return [winnerTeam, updater]
}
