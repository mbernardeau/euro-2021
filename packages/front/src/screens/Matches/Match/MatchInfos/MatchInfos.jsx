import Tooltip from '@material-ui/core/Tooltip'
import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import fr from 'date-fns/locale/fr'
import PropTypes from 'prop-types'
import React from 'react'
import { useStadium } from '../../../../hooks'
import './matchInfos.scss'
import StadiumTooltip from './StadiumTooltip'

const MatchInfos = ({ match }) => {
  const dateTime = match.dateTime.toDate()
  const stadium = useStadium(match.stadium, {})

  return (
    <div className="match-infos-container">
      <Tooltip
        title={format(dateTime, 'PPPppp', { locale: fr })}
        enterTouchDelay={0}
      >
        <div>
          {formatDistanceToNow(dateTime, { locale: fr, addSuffix: true })}
        </div>
      </Tooltip>
      <div>•</div>
      <Tooltip title={<StadiumTooltip {...stadium} />} enterTouchDelay={0}>
        <div>{stadium.city}</div>
      </Tooltip>
      <div>•</div>
      <div>{match.streaming}</div>
    </div>
  )
}

MatchInfos.defaultProps = {
  match: {
    dateTime: 0,
  },
  stadium: {},
}

MatchInfos.propTypes = {
  match: PropTypes.shape({
    dateTime: PropTypes.shape({
      toDate: PropTypes.func.isRequired,
    }).isRequired,
  }),
  stadium: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
  }),
}

export default MatchInfos
