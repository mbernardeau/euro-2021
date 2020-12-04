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
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  preloadAuth,
  preloadFirestore,
  SuspenseWithPerf,
  useFirebaseApp,
} from 'reactfire'
import { useIsUserAdmin, useIsUserConnected } from '../../hooks'
import FAQPage from '../FAQ'
import GroupsPage from '../Groups'
import HomePage from '../HomePage'
import MatchesPage from '../Matches'
import MatchesValidationPage from '../MatchesValidation'
import NotFoundPage from '../NotFoundPage'
import RankingPage from '../Ranking'
import RulesPage from '../Rules'
import Stadiums from '../Stadiums'
import ValidInscriptionPage from '../ValidInscription'
import './App.scss'
import ConnectionWidget from './ConnectionWidget'
import NavigationMenu from './NavigationMenu'

const App = () => {
  const firebaseApp = useFirebaseApp()

  preloadAuth({ firebaseApp })
  preloadFirestore({ firebaseApp })

  const isConnected = useIsUserConnected()
  const isAdmin = useIsUserAdmin()
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
            <Typography variant="h1" color="inherit">
              Road to Russia 2018
            </Typography>
          </div>
          <SuspenseWithPerf fallback={null} traceId={'load-connexion'}>
            <ConnectionWidget />
          </SuspenseWithPerf>
        </Toolbar>
      </AppBar>

      <NavigationMenu
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />

      <div className="app-content">
        {/* Routes accessibles sans connexion */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/rules" component={RulesPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/stadiums" component={Stadiums} />

          {/* Routes accessibles avec connexion */}
          {isConnected && <Route path="/matches" component={MatchesPage} />}
          {isConnected && <Route path="/ranking" component={RankingPage} />}
          {isConnected && <Route path="/groups" component={GroupsPage} />}

          {/* Route accessible pour admin */}
          {isConnected && isAdmin && (
            <Route
              path="/matchesvalidation"
              component={MatchesValidationPage}
            />
          )}
          {isConnected && isAdmin && (
            <Route path="/validinscription" component={ValidInscriptionPage} />
          )}

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
