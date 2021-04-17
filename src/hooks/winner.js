import { useCallback } from 'react'
import { useWinnerTeam } from './opponent'
import { useFirestore } from 'reactfire'
import { useSnackbar } from 'notistack'

export const useSelectedWinner = () => {
  const { uid, winnerTeam } = useWinnerTeam()
  const firestore = useFirestore()
  const { enqueueSnackbar } = useSnackbar()

  const updater = useCallback(
    (team) =>
      firestore
        .collection('opponents')
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
