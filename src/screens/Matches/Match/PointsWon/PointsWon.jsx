import React from 'react'
import PropTypes from 'prop-types'

import InfoIcon from '@material-ui/icons/Info'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import isNumber from 'lodash/isNumber'

import './PointsWon.scss'

const findWinner = (scoreA, scoreB) => {
  if (scoreA > scoreB) return 'A'
  if (scoreA === scoreB) return 'N'
  return 'B'
}

const getMessage = (goodScore, goodWinner, hasBet) => {
  if (!hasBet) return "Vous n'avez pas pronostiqué"
  if (goodScore) return 'Vous avez pronostiqué le score parfait!'
  else if (goodWinner) return 'Vous avez le bon résultat'
  return 'Dommage, vous ferez mieux la prochaine fois'
}

const getOdd = (odds, winner) =>
({
  A: odds.A,
  B: odds.B,
  N: odds.N,
}[winner])

const getCalculus = (odds, winner, goodScore, goodWinner) => {
  const odd = getOdd(odds, winner)
  if (goodScore) return `🤩 4 × ${odd} = ${4 * odd}`
  if (goodWinner) return `😐 2 × ${odd} = ${2 * odd}`
  return '0 + 0 = 😶'
}

const PointsWon = ({ pointsWon, scores, betTeamA, betTeamB, odds }) => {
  if (!scores) return null

  const { A, B } = scores
  const matchWinner = findWinner(A, B)
  const goodScore = A === betTeamA && B === betTeamB
  const hasBet = isNumber(pointsWon)
  const goodWinner = !goodScore && hasBet && matchWinner === findWinner(betTeamA, betTeamB)

  return (
    <div className="points-won-container">
      <Typography variant="h4">{getMessage(goodScore, goodWinner, hasBet)}</Typography>
      <div className="points-won-container">
        <Typography
          variant="body1"
          className={`points-won ${goodScore ? 'good-score' : ''} ${goodWinner ? 'good-winner' : ''
            }`}
        >
          {pointsWon > 0 ? '+' : ''} {pointsWon || 0} point{pointsWon > 1 ? 's' : ''}
        </Typography>
        <Tooltip
          title={getCalculus(odds, matchWinner, goodScore, goodWinner)}
          placement="right"
          enterTouchDelay={0}
        >
          <InfoIcon className="points-won-info-icon" />
        </Tooltip>
      </div>
    </div>
  )
}

PointsWon.propTypes = {
  pointsWon: PropTypes.number,
  scores: PropTypes.shape({
    A: PropTypes.number.isRequired,
    B: PropTypes.number.isRequired,
  }),
  betTeamA: PropTypes.number,
  betTeamB: PropTypes.number,
  odds: PropTypes.objectOf(PropTypes.number),
}

export default PointsWon
