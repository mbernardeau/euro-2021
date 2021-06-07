import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@material-ui/core/Tooltip'
import './InformationMatch.scss'

// https://docs.google.com/spreadsheets/d/1ZioOtyCblJtJf0WAaRxVWmnibqOeC7eDcJYDVEYRqng/edit?usp=sharing
const getPhaseText = (phase) =>
  ({
    0: 'Côtes normales',
    8: 'Côtes augmentées de 65%',
    4: 'Côtes augmentées de 250%',
    2: 'Côtes augmentées de 360%',
    1: 'Côtes augmentées de 560%',
  }[phase])

const getPhaseAff = (phase) =>
  ({
    8: '8eme',
    4: '4rts',
    2: 'Demi',
    1: 'Fin.',
  }[phase])

const InformationMatch = ({ phase, group }) => {
  return (
    <Tooltip title={getPhaseText(phase)} placement="top" enterTouchDelay={0}>
      <div className="tooltip-phase-container">
        {phase !== '0' ? getPhaseAff(phase) : `Gr. ${group}`}
      </div>
    </Tooltip>
  )
}

InformationMatch.propTypes = {
  phase: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
}

export default InformationMatch
