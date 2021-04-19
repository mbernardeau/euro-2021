import { useCallback } from 'react'
import { useUserProfile } from './user'
import { useFirestore } from 'reactfire'
import { useSnackbar } from 'notistack'

export const useSelectedWinner = () => {
  const { uid, winnerTeam } = useUserProfile()
  const firestore = useFirestore()
  const { enqueueSnackbar } = useSnackbar()

  const updater = useCallback(
    (team) =>
      firestore
        .collection('users')
        .doc(uid)
        .update({
          [`winnerTeam`]: team,
        })
        .then(() =>
          enqueueSnackbar('Équipe mise à jour', { variant: 'success' }),
        )
        .catch(() =>
          enqueueSnackbar('Mise à jour échouée :(', { variant: 'error' }),
        ),
    [firestore, enqueueSnackbar, uid],
  )

  return [winnerTeam, updater]
}
