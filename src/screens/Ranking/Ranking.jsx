import AppBar from '@mui/material/AppBar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import isEmpty from 'lodash/isEmpty'
import { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGroupsForUserMember } from '../../hooks/groups'
import GroupRanking from './GroupRanking'
import './ranking.scss'

const Ranking = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const groups = useGroupsForUserMember()
  const handleTabChange = (event, value) => {
    setSelectedTab(value)
  }

  return isEmpty(groups) ? (
    <>
      <div className="ranking-page-div">
        <p>
          Pour pouvoir visualiser dans le classement, il vous faut tout
          d&apos;abord <Link to="/groups">créer ou rejoindre une tribu</Link>.
          Si cela est dejà fait, vérifier que vous avez bien payé le droit
          d&apos;entrée sur la{' '}
          <a
            title="Site cagnotte"
            href="https://www.paypal.com/pools/c/8zxiGanwSa"
            target="_blank"
            rel="noreferrer"
          >
            cagnotte
          </a>
          , en paiement liquide ou par <Link to="/rib">virement bancaire</Link>.
          Si cela est également fait, veuillez attendre la validation des
          administrateurs.
        </p>
      </div>
    </>
  ) : (
    <>
      <AppBar position="fixed" className="ranking-tab-bar">
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          {groups.map((group) => (
            <Tab key={group.id} label={group.data().name} />
          ))}
        </Tabs>
      </AppBar>
      <div className="ranking-container">
        {!isEmpty(groups) && <GroupRanking {...groups[selectedTab]?.data()} />}
      </div>
    </>
  )
}

Ranking.propTypes = {}

const RankingWithSuspense = (props) => {
  return (
    <Suspense fallback="Loading groups...">
      <Ranking {...props} />
    </Suspense>
  )
}

export default RankingWithSuspense
