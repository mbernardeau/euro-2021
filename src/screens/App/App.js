/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import Baniere_mobile from '../../assets/visuels/baniere_pm.png'
import Baniere from '../../assets/visuels/bandeausignature.png'
import React, { Suspense, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  AuthCheck,
  preloadAuth,
  preloadFirestore,
  preloadFunctions,
  preloadMessaging,
  useAuth,
  useFirebaseApp,
  useFirestore,
} from 'reactfire'
import { useNotificationPermission } from '../../hooks/notifications'
import FAQPage from '../FAQ'
import GroupsPage from '../Groups'
import HomePage from '../HomePage'
import MatchesPage from '../Matches'
import NotFoundPage from '../NotFoundPage'
import NotificationHandler from '../Notifications/NotificationHandler'
import Profile from '../Profile'
import RankingPage from '../Ranking'
import Rib from '../Rib'
import RulesPage from '../Rules'
import Stadiums from '../Stadiums'
import ValidInscriptionPage from '../ValidInscription'
import './App.scss'
import ConnectionWidget from './ConnectionWidget'
import NavigationMenu from './NavigationMenu'

/**
 * Mise à jour du profil utilisateur (dans la collection `users` sur une connection)
 */
const updateUserProfile = (firestore, auth, FieldValue) => async (user) => {
  // getRedirectResult ne sera rempli que lors d'un connexion manuelle.
  // Les reconnexions auto et les rafraichissments de token ne donnent pas les `additionalUserInfo`
  const userCredentials = await auth.getRedirectResult()

  let additionalUserInfo = {}
  if (userCredentials.user) {
    const { providerId, profile } = userCredentials.additionalUserInfo
    if (profile?.picture?.data?.url) {
      user.photoURL = await user.updateProfile({
        photoURL: profile?.picture?.data?.url,
      })
    }

    additionalUserInfo = {
      providerId,
      profile,
    }
  }

  return firestore
    .collection('users')
    .doc(user.uid)
    .set(
      {
        uid: user.uid,
        avatarUrl:
          additionalUserInfo.profile?.picture?.data?.url ?? user.photoURL,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        providerData: user.providerData,
        lastConnection: FieldValue.serverTimestamp(),
        nbConnections: FieldValue.increment(1),
        ...additionalUserInfo,
      },
      { merge: true },
    )
}

const App = () => {
  const firebaseApp = useFirebaseApp()

  preloadAuth({ firebaseApp })
  preloadFirestore({ firebaseApp })
  preloadFunctions({
    region: 'europe-west3',
    firebaseApp,
  })
  preloadMessaging({ firebaseApp })

  const { permission } = useNotificationPermission()

  const auth = useAuth()
  const firestore = useFirestore()
  const FieldValue = useFirestore.FieldValue

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await updateUserProfile(firestore, auth, FieldValue)(user)
    }
  })

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <AppBar>
        <Toolbar className="app-toolbar">
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon />
          </IconButton>
          <div className="app-toolbar-title">
            <img id="imgDesktop" src={Baniere} alt="Baniere" />
            <img id="imgMobile" src={Baniere_mobile} alt="Baniere" />
          </div>
          <Suspense fallback={null}>
            <ConnectionWidget />
          </Suspense>
        </Toolbar>
      </AppBar>

      <NavigationMenu
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />

      <AuthCheck>
        {permission === 'granted' && <NotificationHandler />}
      </AuthCheck>

      <div className="app-content">
        {/* Routes accessibles sans connexion */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/rules" component={RulesPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/stadiums" component={Stadiums} />

          <AuthCheck>
            {/* Routes accessibles avec connexion */}
            <Route path="/matches" component={MatchesPage} />
            <Route path="/ranking" component={RankingPage} />
            <Route path="/groups" component={GroupsPage} />
            <Route path="/profile" component={Profile} />
            <Route path="/rib" component={Rib} />

            {/* Route accessible pour admin */}
            <AuthCheck requiredClaims={{ role: 'admin' }}>
              <Route
                path="/validinscription"
                component={ValidInscriptionPage}
              />
            </AuthCheck>
          </AuthCheck>

          {/* NotFoundPage en dernier choix sinon il est active */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  )
}

App.propTypes = {
  user: PropTypes.object,
}

export default App
