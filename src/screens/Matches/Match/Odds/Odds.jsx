import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import padStart from 'lodash/padStart'

import './Odds.scss'

const toHex = (number) =>
  padStart(Math.min(Math.round(Math.abs(number)), 255).toString(16), 2, '0')

const getColor = (value) => {
  const r = (128 / 13) * (value + 1)
  const g = (-128 / 11) * (value - 12)
  return `#${toHex(r)}${toHex(g)}00`
}

const Odds = ({ bet_teamA, bet_teamB, odds, phase, teamA, teamB }) => {
  const oddBasis =
    bet_teamA && bet_teamB ? (
      <div className="odds-container">
        <Tooltip placement="top" title="Cote du match nul" enterTouchDelay={0}>
          <div className="odd" style={{ backgroundColor: getColor(odds.N) }}>
            {odds.N}
          </div>
        </Tooltip>
      </div>
    ) : (
      <div></div>
    )

  return (
    phase &&
    (phase === '0'
      ? oddBasis
      : {
          /*
          todo - code phase finale odds
          <Fragment>
        {oddBasis}
        <div className="odds-container">
          <Tooltip
            placement="right"
            title={`Cote de victoire finale de l'équipe: ${teamA.name}`}
            enterTouchDelay={0}
          >
            <div className="odd" style={{ backgroundColor: getColor(P1) }}>
              {P1}
            </div>
          </Tooltip>
          <Tooltip
            placement="left"
            title={`Cote de victoire finale de l'équipe: ${teamB.name}`}
            enterTouchDelay={0}
          >
            <div className="odd" style={{ backgroundColor: getColor(P2) }}>
              {P2}
            </div>
          </Tooltip>
        </div>
      </Fragment>*/
        })
  )
}

Odds.propTypes = {
  P1: PropTypes.number,
  P2: PropTypes.number,
  A: PropTypes.number,
  B: PropTypes.number,
  N: PropTypes.number,
  phase: PropTypes.string,
  teamA: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  teamB: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}

export default Odds
