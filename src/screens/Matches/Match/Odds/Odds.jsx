import Tooltip from '@material-ui/core/Tooltip'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import OddDialog from './OddDialog'
import isNil from 'lodash/isNil'
import padStart from 'lodash/padStart'
import PropTypes from 'prop-types'
import React from 'react'
import './Odds.scss'

const toHex = (number) =>
  padStart(Math.min(Math.round(Math.abs(number)), 255).toString(16), 2, '0')

const getColor = (value) => {
  const r = (128 / 13) * (value + 1)
  const g = (-128 / 11) * (value - 12)
  return `#${toHex(r)}${toHex(g)}00`
}

const Odds = ({ name_teamA, name_teamB, bet_teamA, bet_teamB, odds }) => {
  const oddUsed =
    bet_teamA + bet_teamB < 7 ? odds[`P${bet_teamA}${bet_teamB}`] : odds.Pautre

  const oddBasis = (
    <div className="odds-container">
      <div className="odd-selected">
        <Tooltip placement="top" title="Cote de ce score" enterTouchDelay={0}>
          {!isNil(bet_teamA) && !isNil(bet_teamB) ? (
            <div className="odd" style={{ backgroundColor: getColor(oddUsed) }}>
              {oddUsed}
            </div>
          ) : (
            <HelpOutlineIcon></HelpOutlineIcon>
          )}
        </Tooltip>
      </div>
      <div className="odd-dialog">
        <OddDialog
          odds={odds}
          name_teamA={name_teamA}
          name_teamB={name_teamB}
        ></OddDialog>
      </div>
    </div>
  )

  return oddBasis
}

Odds.propTypes = {
  name_teamA: PropTypes.string.isRequired,
  name_teamB: PropTypes.string.isRequired,
  bet_teamA: PropTypes.number,
  bet_teamB: PropTypes.number,
  odds: PropTypes.exact({
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
}

export default Odds
