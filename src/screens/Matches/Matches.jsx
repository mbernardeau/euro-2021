import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'

import Match from './Match'

import './matches.scss'

class Matches extends Component {
  state = { selectedTab: 0 }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value })
  }

  render() {
    const { finishedMatches, futureMatches } = this.props
    const { selectedTab } = this.state
    const matches = selectedTab === 0 ? futureMatches : finishedMatches

    return (
      <Fragment>
        <AppBar position="fixed" className="matches-tab-bar">
          <Tabs value={selectedTab} onChange={this.handleTabChange} centered>
            <Tab label="En cours" />
            <Tab label="Terminés" />
          </Tabs>
        </AppBar>
        <div className="matches-container">
          {map(matches, match => <Match match={match} key={match.id} matchId={match.id} />)}
        </div>
      </Fragment>
    )
  }
}

Matches.propTypes = {
  finishedMatches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  futureMatches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
}

export default Matches
