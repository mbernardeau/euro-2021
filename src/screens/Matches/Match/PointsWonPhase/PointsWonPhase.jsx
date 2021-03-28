import React from 'react'
import PropTypes from 'prop-types'

import InfoIcon from '@material-ui/icons/Info'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import isNumber from 'lodash/isNumber'

import './PointsWonPhase.scss'

const findResult = (scoreA, scoreB) => {
  if (scoreA > scoreB) return 'A'
  if (scoreA === scoreB) return 'N'
  return 'B'
}

const findFinalWinner = (scoreA, scoreB, winner) => {
  if (scoreA > scoreB) return 'A'
  if (scoreA === scoreB) return winner
  return 'B'
}

const getMessage = (goodScore, goodWinner, finalWinner, hasBet) => {
  if (!hasBet) return "Vous n'avez pas pronostiqué"
  if (goodScore)
    return finalWinner
      ? 'Vous avez pronostiqué le score parfait (plus le bon vainqueur) !'
      : "Vous avez pronostiqué le score parfait mais vous n'avez pas le bon vainqueur !"
  else if (goodWinner)
    return finalWinner
      ? 'Vous avez le bon résultat (plus le bon vainqueur) !'
      : "Vous avez le bon résultat mais vous n'avez pas le bon vainqueur !"
  return finalWinner
    ? 'Vous avez le bon vainqueur !'
    : 'Dommage, vous ferez mieux la prochaine fois'
}

const getPhaseCoeff = (phase) =>
  ({
    8: {
      bonScore: 5,
      bonVainqueur: 2,
      bonVainqueurFinal: 2,
    },
    4: {
      bonScore: 8,
      bonVainqueur: 3,
      bonVainqueurFinal: 3,
    },
    2: {
      bonScore: 13,
      bonVainqueur: 5,
      bonVainqueurFinal: 5,
    },
    3: {
      bonScore: 15,
      bonVainqueur: 6,
      bonVainqueurFinal: 6,
    },
    1: {
      bonScore: 22,
      bonVainqueur: 8,
      bonVainqueurFinal: 8,
    },
  }[phase])

const getOdd = (odds, winner) =>
  ({
    A: odds.A,
    B: odds.B,
    N: odds.N,
  }[winner])

const getOddFinalWinner = (odds, winner) => (winner === 'A' ? odds.P1 : odds.P2)

const getCalculus = (
  phase,
  odds,
  winner,
  matchFinalWinner,
  finalWinner,
  goodScore,
  goodWinner,
) => {
  const odd = getOdd(odds, winner)
  const oddFinal = getOddFinalWinner(odds, matchFinalWinner)
  const phaseCoeff = getPhaseCoeff(phase)

  if (goodScore)
    return finalWinner
      ? `🤩 ${phaseCoeff.bonScore} × ${odd} + ${
          phaseCoeff.bonVainqueurFinal
        } x ${oddFinal} = ${
          phaseCoeff.bonScore * odd + phaseCoeff.bonVainqueurFinal * oddFinal
        }`
      : `🤩 ${phaseCoeff.bonScore} × ${odd} = ${4 * odd}`
  if (goodWinner)
    return finalWinner
      ? `😐 ${phaseCoeff.bonVainqueur} × ${odd} + ${
          phaseCoeff.bonVainqueurFinal
        } x ${oddFinal} = ${2 * odd + phaseCoeff.bonVainqueurFinal * oddFinal}`
      : `😐 ${phaseCoeff.bonVainqueur} × ${odd} = ${2 * odd}`
  return finalWinner
    ? `😐 ${phaseCoeff.bonVainqueurFinal} x ${oddFinal} = ${
        phaseCoeff.bonVainqueurFinal * oddFinal
      }`
    : '0 + 0 = 😶'
}

const PointsWon = ({
  phase,
  pointsWon,
  scores,
  betTeamA,
  betTeamB,
  betWinner,
  odds,
}) => {
  if (!scores) return null

  const { A, B, winner } = scores
  const matchWinner = findResult(A, B)
  const matchFinalWinner = findFinalWinner(A, B, winner)
  const goodScore = A === betTeamA && B === betTeamB
  const hasBet = isNumber(pointsWon)
  const goodWinner =
    !goodScore && hasBet && matchWinner === findResult(betTeamA, betTeamB)
  const finalWinner =
    hasBet &&
    matchFinalWinner === findFinalWinner(betTeamA, betTeamB, betWinner)

  return (
    <div className="points-won-container">
      {/* <Typography variant="h2">
        {getMessage(goodScore, goodWinner, finalWinner, hasBet)}
      </Typography> */}
      <div className="points-won-container">
        <Typography
          variant="body1"
          className={`points-won ${goodScore ? 'good-score' : ''} ${
            goodWinner ? 'good-winner' : ''
          }`}
        >
          {pointsWon || 0} pts
        </Typography>
        {/* <Tooltip
          title={getCalculus(
            phase,
            odds,
            matchWinner,
            matchFinalWinner,
            finalWinner,
            goodScore,
            goodWinner,
          )}
          placement="right"
          enterTouchDelay={0}
        >
          <InfoIcon className="points-won-info-icon" />
        </Tooltip> */}
      </div>
    </div>
  )
}

PointsWon.propTypes = {
  phase: PropTypes.string.isRequired,
  pointsWon: PropTypes.number,
  scores: PropTypes.shape({
    A: PropTypes.number.isRequired,
    B: PropTypes.number.isRequired,
    winner: PropTypes.string.isRequired,
  }),
  betTeamA: PropTypes.number,
  betTeamB: PropTypes.number,
  betWinner: PropTypes.string,
  odds: PropTypes.objectOf(PropTypes.number),
}

export default PointsWon
