/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { firebaseReducer } from 'react-redux-firebase'

import groups from './groups'
import ui from './ui'
import users from './users'
import { firestoreReducer } from 'redux-firestore'

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    groups,
    ui,
    users,
  })
}
