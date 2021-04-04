import React from 'react'
import PropTypes from 'prop-types'

import InfoIcon from '@material-ui/icons/Info'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import isNumber from 'lodash/isNumber'

import './PointsWon.scss'

// Proxi points
const proxiCoeff = {
  SCORE_PARFAIT: 1,
  PROXI1: 0.6,
  PROXI2: 0.35,
  PROXI3: 0.2,
}

// https://docs.google.com/spreadsheets/d/1ZioOtyCblJtJf0WAaRxVWmnibqOeC7eDcJYDVEYRqng/edit?usp=sharing
const getPhaseCoeff = (phase) =>
  ({
    0: 1,
    8: 1.67,
    4: 3.34,
    2: 6.69,
    1: 13.37,
  }[phase])

const getMessage = (proxi, hasBet) => {
  if (!hasBet) return "Vous n'avez pas pronostiqué"
  if (proxi === proxiCoeff.SCORE_PARFAIT)
    return 'Vous avez pronostiqué le score parfait!'
  else if (proxi === proxiCoeff.PROXI1) return 'Vous êtes en première proximité'
  else if (proxi === proxiCoeff.PROXI2) return 'Vous êtes en seconde proximité'
  else if (proxi === proxiCoeff.PROXI3)
    return 'Vous êtes en troisième proximité'
  return 'Dommage, vous ferez mieux la prochaine fois'
}

const getCalculus = (odd, proxi, phase) => {
  const calculText = `${proxi} × ${odd} × ${phase} = ${proxi * odd * phase}`
  if (proxi === proxiCoeff.SCORE_PARFAIT) return `🤩 ` + calculText
  else if (proxi === proxiCoeff.PROXI1) return `😐 ` + calculText
  else if (proxi === proxiCoeff.PROXI2) return `😐 ` + calculText
  else if (proxi === proxiCoeff.PROXI3) return `😐 ` + calculText
  return '0 + 0 = 😶'
}

const PointsWon = ({ pointsWon, scores, phase, betTeamA, betTeamB, odds }) => {
  if (!scores) return null

  // No bet ?
  const hasBet = isNumber(pointsWon)

  // Check proxi
  const { A, B } = scores
  const nbButs = A + B
  const phaseCoeff = getPhaseCoeff(phase)
  const oddScore = nbButs < 7 ? odds[`P${A}${B}`] : odds.Pautre
  const proxiArrondie = pointsWon / oddScore + 0.1 // 0.1 en marge
  const realProxi =
    proxiArrondie > proxiCoeff.SCORE_PARFAIT
      ? proxiCoeff.SCORE_PARFAIT
      : proxiArrondie > proxiCoeff.PROXI1
      ? proxiCoeff.PROXI1
      : proxiArrondie > proxiCoeff.PROXI2
      ? proxiCoeff.PROXI2
      : proxiArrondie > proxiCoeff.PROXI3
      ? proxiCoeff.PROXI3
      : 0

  return (
    <div className="points-won-container">
      {<Typography variant="h4">{getMessage(realProxi, hasBet)}</Typography>}
      <div className="points-won-container">
        <Typography
          variant="body1"
          className={`points-won ${
            realProxi === proxiCoeff.SCORE_PARFAIT ? 'good-score' : ''
          } ${realProxi >= proxiCoeff.PROXI3 ? 'good-winner' : ''}`}
        >
          {pointsWon || 0} pts
        </Typography>
        {
          <Tooltip
            title={getCalculus(oddScore, realProxi, phaseCoeff)}
            placement="right"
            enterTouchDelay={0}
          >
            <InfoIcon className="points-won-info-icon" />
          </Tooltip>
        }
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
