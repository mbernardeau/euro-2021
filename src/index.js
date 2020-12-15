// Import all the third party stuff
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { FirebaseAppProvider } from 'reactfire'
import firebaseConfig from './firebaseConfig'
import { SnackbarProvider } from 'notistack'
import * as Sentry from '@sentry/react'
import { Integrations as TracingIntegrations } from '@sentry/tracing'

// Import root app
import App from './screens/App'

// Import CSS reset and Global Styles
import './index.css'

import theme from './theme'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

Sentry.init({
  dsn:
    'https://d6853c21fd4d412da6f6b369ee5f5676@o491892.ingest.sentry.io/5558208',
  autoSessionTracking: true,
  integrations: [new TracingIntegrations.BrowserTracing()],
  // À réduire pour la prod
  tracesSampleRate: 1.0,
})

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider>
              <Suspense fallback="App loading something">
                <App />
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
