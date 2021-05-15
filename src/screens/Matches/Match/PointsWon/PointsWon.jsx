import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import './PointsWon.scss'

// Proxi points
const proxiCoeff = [1, 0.6, 0.35, 0.2]
const proxiEmoji = [`🤩 `, `😐 `, `😐 `, `😐 `]

const round = (value, decimals) =>
  Number(`${Math.round(`${value}e${decimals}`)}${`e-${decimals}`}`)

const getCalculus = (odd, proxiLevel) => {
  const calculText = `${proxiCoeff[proxiLevel]} × ${odd} = ${round(
    proxiCoeff[proxiLevel] * odd,
    2,
  )}`
  return proxiLevel ? proxiEmoji[proxiLevel] + calculText : '0 + 0 = 😶'
}

const PointsWon = ({ pointsWon, proxi, scores, odds }) => {
  if (!scores) return null

  // Check proxi
  const { A, B } = scores
  const nbButs = A + B
  const oddScore = nbButs < 7 ? odds[`P${A}${B}`] : odds.Pautre

  return (
    <div className="points-won-container">
      {
        <Tooltip
          title={getCalculus(oddScore, proxi)}
          placement="right"
          enterTouchDelay={0}
        >
          <Typography variant="h3" style={{ fontWeight: 'bold' }}>
            {pointsWon || 0} pts
          </Typography>
        </Tooltip>
      }
    </div>
  )
}

PointsWon.propTypes = {
  pointsWon: PropTypes.number,
  proxi: PropTypes.number,
  scores: PropTypes.shape({
    A: PropTypes.number.isRequired,
    B: PropTypes.number.isRequired,
  }),
  odds: PropTypes.objectOf(PropTypes.number),
}

export default PointsWon
