import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@material-ui/core/Tooltip'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import './InformationResult.scss'

const proxiText = [
  'Vous avez pronostiqué le score parfait!',
  'Vous êtes en première proximité',
  'Vous êtes en seconde proximité',
  'Vous êtes en troisième proximité',
  'Vous êtes en quatrième proximité',
]

const getMessage = (proxiLevel, hasBet) => {
  if (!hasBet) return "Vous n'avez pas pronostiqué"
  return isNil(proxiLevel)
    ? 'Dommage, vous ferez mieux la prochaine fois'
    : proxiText[proxiLevel]
}

const InformationResult = ({ proxi, pointsWon }) => {
  // No bet ?
  const hasBet = isNumber(pointsWon)

  return (
    <Tooltip
      title={getMessage(proxi, hasBet)}
      placement="right"
      enterTouchDelay={0}
    >
      <div className="tooltip-svg-container">
        <HelpOutlineIcon></HelpOutlineIcon>
      </div>
    </Tooltip>
  )
}

InformationResult.propTypes = {
  proxi: PropTypes.number,
  pointsWon: PropTypes.number,
}

export default InformationResult
