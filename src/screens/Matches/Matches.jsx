import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useMatches } from '../../hooks'
import Match from './Match'
import './matches.scss'

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
    <Suspense fallback="Loading matches...">
      <Matches {...props} />
    </Suspense>
  )
}

export default MatchesSuspense
