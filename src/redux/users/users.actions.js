import firebase from 'firebase/app'
import keys from 'lodash/keys'
import usersReducer from './users'
import { getUserId } from '../user'

export const fetchUser = userId => (dispatch, getState) => {
  if (!userId || usersReducer.hasKey(userId)(getState())) {
    return
  }
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => {
      dispatch(usersReducer.addOrUpdate({ id: userId, ...doc.data() }))
    })
}

export const fetchUsers = userIds => dispatch => {
  keys(userIds).forEach(userId => {
    dispatch(fetchUser(userId))
  })
}

export const saveWinner = Team => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .update({
      [`winnerTeam`]: Team,
    })
    .then(() => {
      dispatch(fetchUser(userId))
    })
}
