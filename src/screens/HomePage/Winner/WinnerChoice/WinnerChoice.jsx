import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import parseISO from 'date-fns/parseISO'
import isPast from 'date-fns/isPast'
import find from 'lodash/find'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import Flag from '../../../../components/Flag'
import { useTeams } from '../../../../hooks'
import { useCompetitionData } from '../../../../hooks/useCompetitionData'
import './WinnerChoice.scss'

const WinnerChoice = ({ userTeam, onValueChange }) => {
  const teams = useTeams()
  const { startDate } = useCompetitionData()

  return (
    <div className="winner-choice">
      {FlagTest(teams, userTeam)}
      <div className="winner-choice-select-container">
        <Select
          className="winner-choice-select-value"
          value={userTeam ?? ''}
          onChange={onValueChange}
          inputProps={{
            name: 'userTeam',
          }}
          disabled={isPast(parseISO(startDate))}
        >
          {map(teams, (team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.data().name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {OddTest(teams, userTeam)}
    </div>
  )
}

// Affichage du drapeau du pays choisi
const FlagTest = (teams, userTeam) => {
  const teamDisplayed = find(teams, (team) => team.id === userTeam)

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
const OddTest = (teams, userTeam) => {
  const teamDisplayed = find(teams, (team) => team.id === userTeam)

  return (
    teamDisplayed && (
      <Tooltip title="Cote pour la victoire finale" placement="right">
        <Typography variant="body1" className="winner-choice-odd">
          {teamDisplayed.winOdd}
        </Typography>
      </Tooltip>
    )
  )
}

WinnerChoice.defaultProps = {
  teams: [],
}

WinnerChoice.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({})),
  userTeam: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
}

export default WinnerChoice
