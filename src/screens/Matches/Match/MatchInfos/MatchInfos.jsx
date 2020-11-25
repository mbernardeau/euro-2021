import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip'

import StadiumTooltip from './StadiumTooltip'

import './matchInfos.scss'
import { useStadium } from '../../../../hooks'

const MatchInfos = ({ match }) => {
  const dateTime = moment(match.dateTime.toDate())
  const stadium = useStadium(match.stadium, {})

  return (
    <div className="match-infos-container">
      <Tooltip title={dateTime.format('LLL')} enterTouchDelay={0}>
        <div>{dateTime.fromNow()}</div>
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
    dateTime: PropTypes.instanceOf(Date).isRequired,
  }),
  stadium: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
  }),
}

export default MatchInfos
