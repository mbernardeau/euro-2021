import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import map from 'lodash/map'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useMatches } from '../../hooks'
import Match from './Match'
import './matches.scss'

const Matches = () => {
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
      selectedTab === 0
        ? matches.filter((match) => {
            const timestamp = match.get('dateTime').toMillis()

            return timestamp > comparingDate
          })
        : matches
            .filter((match) => {
              const timestamp = match.get('dateTime').toMillis()

              return timestamp <= comparingDate
            })
            .reverse(),
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

const MatchesSuspense = (props) => {
  return (
    <Suspense fallback="Loading matches...">
      <Matches {...props} />
    </Suspense>
  )
}

export default MatchesSuspense
