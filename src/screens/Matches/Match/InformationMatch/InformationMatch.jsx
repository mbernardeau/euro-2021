import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@material-ui/core/Tooltip'
import './InformationMatch.scss'

// https://docs.google.com/spreadsheets/d/1ZioOtyCblJtJf0WAaRxVWmnibqOeC7eDcJYDVEYRqng/edit?usp=sharing
const getPhaseText = (phase) =>
  ({
    0: 'Côtes normales',
    8: 'Côtes augmentées de 67% en moyenne',
    4: 'Côtes augmentées de 234% en moyenne',
    2: 'Côtes augmentées de 569% en moyenne',
    1: 'Côtes augmentées de 1237% en moyenne',
  }[phase])

const InformationMatch = ({ phase, group }) => {
  return (
    <Tooltip title={getPhaseText(phase)} placement="top" enterTouchDelay={0}>
      <div className="tooltip-phase-container">
        {phase !== '0' ? `${phase}` : `${group}`}
      </div>
    </Tooltip>
  )
}

InformationMatch.propTypes = {
  phase: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
}

export default InformationMatch
