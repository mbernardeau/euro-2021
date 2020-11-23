import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import GroupRanking from './GroupRanking'

import './ranking.scss'

const Ranking = ({ groups = [] }) => {
  const [selectedTab, setselectedTab] = useState()

  const handleTabChange = (event, value) => {
    setselectedTab(value)
  }

  return isEmpty(groups) ? (
    <Fragment>
      <div className="ranking-page-div">
        <p>
          Pour pouvoir vous visualiser dans le classement, il vous faut tout d&apos;abord{' '}
          <Link to="/groups">créer ou rejoindre une tribu</Link>
        . Si cela est dejà fait, vérifier que vous avez bien payé le droit d&apos;entrée sur la{' '}
          <a
            title="Site cagnotte"
            href="https://www.paypal.com/pools/c/84gsKV8QG8"
            target="_blank" rel="noreferrer"
          >
            cagnotte
        </a>. Si cela est également fait, veuillez attendre la validation des administrateurs.
      </p>
      </div>
    </Fragment>
  ) : (
      <Fragment>
        <AppBar position="fixed" className="ranking-tab-bar">
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            {groups.map(group => <Tab key={group.id} label={group.name} />)}
          </Tabs>
        </AppBar>
        <div className="ranking-container">
          {!isEmpty(groups) && <GroupRanking {...groups[selectedTab]} />}
        </div>
      </Fragment>
    )
}

Ranking.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
}

export default Ranking
