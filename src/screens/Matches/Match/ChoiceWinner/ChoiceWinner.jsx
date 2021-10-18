import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import './ChoiceWinner.scss'

const ChoiceWinner = ({ teamA, teamB, betValue, onBetValueUpdated, past }) => (
  <div className="bet">
    <div className="bet-select-container">
      <Typography>Choix du vainqueur final en cas de match nul : </Typography>
      <Select
        className="bet-select-value"
        value={betValue || ''}
        onChange={onBetValueUpdated}
        disabled={past}
      >
        <MenuItem value="A">{teamA.name}</MenuItem>
        <MenuItem value="B">{teamB.name}</MenuItem>
      </Select>
    </div>
  </div>
)

ChoiceWinner.propTypes = {
  teamA: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  teamB: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  betValue: PropTypes.string,
  past: PropTypes.bool,
  onBetValueUpdated: PropTypes.func.isRequired,
}

export default ChoiceWinner
