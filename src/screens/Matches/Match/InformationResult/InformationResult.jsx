import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '@material-ui/core/Tooltip'

import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import './InformationResult.scss'

const InformationResult = ({ valid }) => (
  <Tooltip
    title={valid ? 'Match gagne' : 'Match perdu'}
    placement="right"
    enterTouchDelay={0}
  >
    <div className="tooltip-svg-container">
      {valid && <HelpOutlineIcon></HelpOutlineIcon>}
    </div>
  </Tooltip>
)

InformationResult.propTypes = {
  valid: PropTypes.bool.isRequired,
}

export default InformationResult
