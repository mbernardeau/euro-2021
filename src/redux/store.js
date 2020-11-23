/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import thunk from 'redux-thunk'
import firebaseConfig from './firebaseConfig'

import createReducer from './reducers'

export default function configureStore(initialState = {}, history) {
  const middlewares = [thunk]

  const enhancers = [applyMiddleware(...middlewares)]

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  const firestore = firebase.firestore()
  firestore.settings({
    timestampsInSnapshots: true,
  })

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(history),
    initialState,
    composeEnhancers(...enhancers),
  )

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then(reducerModule => {
        const createReducers = reducerModule.default
        const nextReducers = createReducers(history)
        store.replaceReducer(nextReducers)
      })
    })
  }

  return store
}
