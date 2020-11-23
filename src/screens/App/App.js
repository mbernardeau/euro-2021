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

import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import HomePage from '../HomePage'
import GroupsPage from '../Groups'
import RankingPage from '../Ranking'
import MatchesPage from '../Matches'
import RulesPage from '../Rules'
import FAQPage from '../FAQ'
import MatchesValidationPage from '../MatchesValidation'
import ValidInscriptionPage from '../ValidInscription'
import NotFoundPage from '../NotFoundPage'

import { isEmpty } from 'react-redux-firebase'

import { Switch, Route } from 'react-router-dom'
import NavigationMenu from './NavigationMenu'
import ConnectionWidget from './ConnectionWidget'

import './App.scss'

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    toggleMenu: PropTypes.func.isRequired,
  }

  render() {
    const { user, toggleMenu } = this.props

    return (
      <Fragment>
        <AppBar>
          <Toolbar className="app-toolbar">
            <IconButton color="inherit" aria-label="Menu" onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            <div className="app-toolbar-title">
              <Typography variant="h1" color="inherit">
                Road to Russia 2018
              </Typography>
            </div>
            <ConnectionWidget />
          </Toolbar>
        </AppBar>

        <NavigationMenu user={user} />

        <div className="app-content">
          {/* Routes accessibles sans connexion */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/rules" component={RulesPage} />
            <Route path="/faq" component={FAQPage} />

            {/* Routes accessibles avec connexion */}
            {!isEmpty(user) && <Route path="/matches" component={MatchesPage} />}
            {!isEmpty(user) && <Route path="/ranking" component={RankingPage} />}
            {!isEmpty(user) && <Route path="/groups" component={GroupsPage} />}

            {/* Route accessible pour admin */}
            {!isEmpty(user) &&
              user.admin && <Route path="/matchesvalidation" component={MatchesValidationPage} />}
            {!isEmpty(user) &&
              user.admin && <Route path="/validinscription" component={ValidInscriptionPage} />}

            {/* NotFoundPage en dernier choix sinon il est active */}
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default App
