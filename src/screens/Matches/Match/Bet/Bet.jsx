import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import map from 'lodash/map'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import Flag from '../../../../components/Flag'
import './Bet.scss'

const Bet = ({ team, betValue, onBetValueUpdated, past }) => {
  return (
    <div className="bet">
      <div className="bet-title">
        <Flag country={team.code} className="bet-flag" />
        <div className="team-name">{team.name}</div>
      </div>
      <div className="bet-select-container">
        <Select
          type="number"
          value={betValue >= 0 ? betValue : ''}
          renderValue={renderValue}
          onChange={onBetValueUpdated}
          disabled={past}
        >
          {menuItems}
        </Select>
      </div>
    </div>
  )
}

/**
 * Render menu items once (from 0 to 10 goals)
 */
const menuItems = map(range(11), (n) => (
  <MenuItem value={n} key={n}>
    {n}
  </MenuItem>
))

/**
 * Pure mini-component to render inner value of the select field choices
 * @param {number} value Value to render
 *
 * @return {React.ReactElement}
 */
const renderValue = (value) => <div className="bet-select-value">{value}</div>

Bet.defaultProps = {
  team: {},
}

Bet.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }),
  onBetValueUpdated: PropTypes.func.isRequired,
  betValue: PropTypes.number,
  past: PropTypes.bool,
}

export default Bet
