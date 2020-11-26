import firebase from 'firebase/app'
import isEmpty from 'lodash/isEmpty'
import { getUserId } from '../user'
import groupsReducer from './groups'

export const fetchGroupsContainingAwaitingMember = () => (dispatch) => {
  firebase
    .firestore()
    .collection('groups')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const group = doc.data()

        // On integre seulement ceux qui contiennent des membres en attente
        if (!isEmpty(group.awaitingMembers)) {
          dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() }))
        }
      })
    })
}

export const fetchGroupsForUser = () => (dispatch) => {
  dispatch(fetchGroupsForUserMember())
  dispatch(fetchGroupsForUserAwaitingMember())
}

export const fetchGroupsForUserMember = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where('members', 'array-contains', userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}

export const fetchGroupsForUserAwaitingMember = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where('awaitingMembers', 'array-contains', userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}

export const fetchGroupById = (id) => (dispatch) => {
  firebase
    .firestore()
    .collection('groups')
    .doc(id)
    .get()
    .then((doc) => {
      dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() }))
    })
}

export const fetchGroupsForUserAdmin = () => (dispatch, getState) => {
  const userId = getUserId(getState())

  firebase
    .firestore()
    .collection('groups')
    .where('createdBy', '==', userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) =>
        dispatch(groupsReducer.addOrUpdate({ id: doc.id, ...doc.data() })),
      )
    })
}

export const validApply = (groupId, userId) => (dispatch) => {
  const db = firebase.firestore()

  db.collection('groups')
    .doc(groupId)
    .update({
      [`awaitingMembers.${userId}`]: firebase.firestore.FieldValue.delete(),
      [`members.${userId}`]: true,
    })
    .then(() => dispatch(fetchGroupById(groupId)))
}
