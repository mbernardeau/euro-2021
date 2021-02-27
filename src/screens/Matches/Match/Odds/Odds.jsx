import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import padStart from 'lodash/padStart'
import isNil from 'lodash/isNil'

import './Odds.scss'

const toHex = (number) =>
  padStart(Math.min(Math.round(Math.abs(number)), 255).toString(16), 2, '0')

const getColor = (value) => {
  const r = (128 / 13) * (value + 1)
  const g = (-128 / 11) * (value - 12)
  return `#${toHex(r)}${toHex(g)}00`
}

const Odds = ({ bet_teamA, bet_teamB, odds, phase, teamA, teamB }) => {
  const oddUsed =
    bet_teamA + bet_teamB < 7 ? odds[`P${bet_teamA}${bet_teamB}`] : odds.Pautre

  const oddBasis =
    !isNil(bet_teamA) && !isNil(bet_teamB) ? (
      <div className="odds-container">
        {!isNil(
          oddUsed,
        ) /* Est-ce utile de faire un controle de coherence ? */ && (
          <Tooltip placement="top" title="Cote de ce score" enterTouchDelay={0}>
            <div className="odd" style={{ backgroundColor: getColor(oddUsed) }}>
              {oddUsed}
            </div>
          </Tooltip>
        )}
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
  bet_teamA: PropTypes.number,
  bet_teamB: PropTypes.number,
  odds: PropTypes.shape({
    P00: PropTypes.number.isRequired,
    P01: PropTypes.number.isRequired,
    P02: PropTypes.number.isRequired,
    P03: PropTypes.number.isRequired,
    P04: PropTypes.number.isRequired,
    P05: PropTypes.number.isRequired,
    P06: PropTypes.number.isRequired,
    P10: PropTypes.number.isRequired,
    P11: PropTypes.number.isRequired,
    P12: PropTypes.number.isRequired,
    P13: PropTypes.number.isRequired,
    P14: PropTypes.number.isRequired,
    P15: PropTypes.number.isRequired,
    P20: PropTypes.number.isRequired,
    P21: PropTypes.number.isRequired,
    P22: PropTypes.number.isRequired,
    P23: PropTypes.number.isRequired,
    P24: PropTypes.number.isRequired,
    P30: PropTypes.number.isRequired,
    P31: PropTypes.number.isRequired,
    P32: PropTypes.number.isRequired,
    P33: PropTypes.number.isRequired,
    P40: PropTypes.number.isRequired,
    P41: PropTypes.number.isRequired,
    P42: PropTypes.number.isRequired,
    P50: PropTypes.number.isRequired,
    P51: PropTypes.number.isRequired,
    P60: PropTypes.number.isRequired,
    Pautre: PropTypes.number.isRequired,
  }),
  phase: PropTypes.string,
  teamA: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  teamB: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}

export default Odds
