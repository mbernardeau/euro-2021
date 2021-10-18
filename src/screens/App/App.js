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

import { getRedirectResult, onAuthStateChanged } from '@firebase/auth'
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import PropTypes from 'prop-types'
import { Suspense, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAuth, useFirestore, useSigninCheck } from 'reactfire'
import Baniere from '../../assets/visuels/bandeausignature.png'
import Baniere_mobile from '../../assets/visuels/baniere_pm.png'
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
const updateUserProfile = (firestore, auth) => async (user) => {
  // getRedirectResult ne sera rempli que lors d'un connexion manuelle.
  // Les reconnexions auto et les rafraichissments de token ne donnent pas les `additionalUserInfo`
  const userCredentials = await getRedirectResult(auth)

  let additionalUserInfo = {}
  if (userCredentials?.user) {
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

  const userCollection = collection(firestore, 'users')
  const userDoc = doc(userCollection, user.uid)
  return setDoc(
    userDoc,
    {
      uid: user.uid,
      avatarUrl:
        additionalUserInfo.profile?.picture?.data?.url ?? user.photoURL,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      providerData: user.providerData,
      lastConnection: serverTimestamp(),
      nbConnections: increment(1),
      ...additionalUserInfo,
    },
    { merge: true },
  )
}

const App = () => {
  const { permission } = useNotificationPermission()

  const auth = useAuth()
  const firestore = useFirestore()

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await updateUserProfile(firestore, auth)(user)
    }
  })

  const [menuOpen, setMenuOpen] = useState(false)

  const {
    data: { signedIn },
  } = useSigninCheck()
  const {
    data: { signedIn: adminUser },
  } = useSigninCheck({ requiredClaims: { admin: true } })

  return (
    <>
      <AppBar>
        <Toolbar className="app-toolbar">
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            size="large"
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

      {signedIn && permission === 'granted' && <NotificationHandler />}

      <div className="app-content">
        <Suspense fallback={<>Loading page...</>}>
          {/* Routes accessibles sans connexion */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/rules" component={RulesPage} />
            <Route path="/faq" component={FAQPage} />
            <Route path="/stadiums" component={Stadiums} />

            {signedIn && (
              <>
                {/* Routes accessibles avec connexion */}
                <Route path="/matches" component={MatchesPage} />
                <Route path="/ranking" component={RankingPage} />
                <Route path="/groups" component={GroupsPage} />
                <Route path="/profile" component={Profile} />
                <Route path="/rib" component={Rib} />

                {/* Route accessible pour admin */}
                {adminUser && (
                  <Route
                    path="/validinscription"
                    component={ValidInscriptionPage}
                  />
                )}
              </>
            )}

            {/* NotFoundPage en dernier choix sinon il est active */}
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </>
  )
}

App.propTypes = {
  user: PropTypes.object,
}

export default App
