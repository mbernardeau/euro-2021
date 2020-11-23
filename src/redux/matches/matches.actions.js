import firebase from 'firebase/app'
import matchReducer from './matches.reducer'

export const fetchMatchList = () => dispatch => {
  firebase
    .firestore()
    .collection('matches')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const match = doc.data()
        const { id } = doc
        dispatch(matchReducer.addOrUpdate({ ...match, dateTime: match.dateTime.toDate(), id }))
      })
    })
}
