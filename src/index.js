// Import all the third party stuff
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { FirebaseAppProvider } from 'reactfire'
import firebaseConfig from './firebaseConfig'
import { SnackbarProvider } from 'notistack'

// Import root app
import App from './screens/App'

// Import CSS reset and Global Styles
import './index.css'

import theme from './theme'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import NotificationPermissionProvider from './screens/Notifications/NotificationPermissionProvider'

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider>
              <Suspense fallback="App loading something">
                <NotificationPermissionProvider>
                  <App />
                </NotificationPermissionProvider>
              </Suspense>
            </SnackbarProvider>
          </MuiThemeProvider>
        </FirebaseAppProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
