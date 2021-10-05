import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@mui/material/Typography'

import './Scores.scss'
import { Tooltip } from '@mui/material'

const Scores = ({ scores }) => {
  if (!scores) return null
  const { A, B, winner } = scores
  const realResult = findResult(A, B)
  const realWinner = realResult === 'N' ? winner : realResult
  return (
    <div className="scores-container">
      <Tooltip title="Score final" placement="top" enterTouchDelay={0}>
        <Typography variant="body2">
          <span className={realWinner === 'A' ? 'winner' : ''}>{A}</span>
          &nbsp;-&nbsp;
          <span className={realWinner === 'B' ? 'winner' : ''}>{B}</span>
        </Typography>
      </Tooltip>
    </div>
  )
}

const findResult = (score1, score2) => {
  if (score1 > score2) return 'A'
  if (score1 === score2) return 'N'
  return 'B'
}

Scores.propTypes = {
  scores: PropTypes.shape({
    A: PropTypes.number.isRequired,
    B: PropTypes.number.isRequired,
    winner: PropTypes.oneOf(['A', 'B', 'N']),
  }),
}

export default Scores
