import firebase from 'firebase/app'
import teamsReducer from './teams.reducer'

export const fetchTeam = teamId => (dispatch, getState) => {
  if (teamsReducer.hasKey(teamId)(getState())) {
    return
  }
  firebase
    .firestore()
    .collection('teams')
    .doc(teamId)
    .get()
    .then(doc => {
      dispatch(teamsReducer.addOrUpdate({ id: teamId, ...doc.data() }))
    })
}

export const fetchTeams = () => dispatch => {
  firebase
    .firestore()
    .collection('teams')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const team = doc.data()
        const { id } = doc
        dispatch(teamsReducer.addOrUpdate({ ...team, id }))
      })
    })
}
