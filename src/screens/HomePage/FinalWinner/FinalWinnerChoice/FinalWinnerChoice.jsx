import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import find from 'lodash/find'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import Flag from '../../../../components/Flag'
import { useTeams } from '../../../../hooks'
import './FinalWinnerChoice.scss'

const FinalWinnerChoice = ({ userTeam, disabled, onValueChange }) => {
  const teams = useTeams()

  return (
    <div className="winner-choice">
      {FlagDisplay(teams, userTeam)}
      <div className="winner-choice-select-container">
        <Select
          className="winner-choice-select-value"
          value={userTeam ?? ''}
          onChange={onValueChange}
          inputProps={{
            name: 'userTeam',
          }}
          disabled={disabled}
        >
          {map(teams, (team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.data().name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {OddDisplay(teams, userTeam)}
    </div>
  )
}

// Affichage du drapeau du pays choisi
const FlagDisplay = (teams, userTeam) => {
  const teamDisplayed = find(teams, (team) => team.id === userTeam)

  console.log(teamDisplayed)

  return (
    teamDisplayed && (
      <Flag
        country={teamDisplayed.data().code}
        className="winner-choice-flag"
      />
    )
  )
}

// Affichage de la cote du pays choisi
const OddDisplay = (teams, userTeam) => {
  const teamDisplayed = find(teams, (team) => team.id === userTeam)

  return (
    teamDisplayed && (
      <Tooltip title="Cote pour la victoire finale" placement="right">
        <Typography variant="h1" className="winner-choice-odd">
          {teamDisplayed.data().winOdd}
        </Typography>
      </Tooltip>
    )
  )
}

FinalWinnerChoice.defaultProps = {
  teams: [],
}

FinalWinnerChoice.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({})),
  userTeam: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
}

export default FinalWinnerChoice
