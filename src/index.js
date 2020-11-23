// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import moment from 'moment'
import {
  ReactReduxFirebaseProvider
} from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { createBrowserHistory } from 'history'
import firebase from 'firebase/app'

// Import root app
import App from './screens/App'

import configureStore from './redux/store'

// Import CSS reset and Global Styles
import './index.css'

import theme from './theme'
import reportWebVitals from './reportWebVitals'

// Set moment locale for the whole app
moment.locale('fr')



// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}
const history = createBrowserHistory()
const store = configureStore(initialState, history)

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users', // firebase root where user profiles are stored
    enableLogging: false, // enable/disable Firebase's database logging
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
}


const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </MuiThemeProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}

render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
