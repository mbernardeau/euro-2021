import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'

import Match from './Match'

import './matches.scss'
import { useState } from 'react'
import { SuspenseWithPerf } from 'reactfire'
import { useMatches } from '../../hooks'

const Matches = ({ finishedMatches, futureMatches }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [comparingDate, setComparingDate] = useState(Date.now())

  const handleTabChange = (event, value) => {
    setSelectedTab(value)
  }

  useEffect(() => {
    const handle = setInterval(() => setComparingDate(Date.now()), 5000)
    return clearInterval(handle)
  })

  const matches = useMatches()

  const filteredMatches = useMemo(
    () =>
      matches.filter((match) => {
        const timestamp = match.get('dateTime').toMillis()

        if (selectedTab === 0) {
          return timestamp > comparingDate
        } else {
          return timestamp <= comparingDate
        }
      }),
    [comparingDate, matches, selectedTab],
  )

  return (
    <>
      <AppBar position="fixed" className="matches-tab-bar">
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="En cours" />
          <Tab label="Terminés" />
        </Tabs>
      </AppBar>
      <div className="matches-container">
        {map(filteredMatches, (documentSnapshot) => (
          <Match matchSnapshot={documentSnapshot} key={documentSnapshot.id} />
        ))}
      </div>
    </>
  )
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

const MatchesSuspense = (props) => {
  return (
    <SuspenseWithPerf fallback="Loading matches..." traceId="matches">
      <Matches {...props} />
    </SuspenseWithPerf>
  )
}

export default MatchesSuspense
