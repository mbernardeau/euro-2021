import firebase from 'firebase/app'
import betReducer from './bets.reducer'
import { getUserId } from '../user'

export const fetchBet = (matchId) => (dispatch, getState) => {
  const uid = getUserId(getState())
  firebase
    .firestore()
    .collection('bets')
    .where('matchId', '==', matchId)
    .where('userId', '==', uid)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        dispatch(betReducer.addOrUpdate({ id: matchId }))
      } else {
        querySnapshot.forEach((doc) =>
          dispatch(betReducer.addOrUpdate({ id: matchId, ...doc.data() })),
        )
      }
    })
}

export const saveBet = (matchId, bet) => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('bets')
    .doc(`${matchId}_${userId}`)
    .set(
      {
        ...bet,
        matchId,
        userId,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    )
    .then(() => {
      dispatch(betReducer.addOrUpdate({ id: matchId, ...bet }))
    })
}
