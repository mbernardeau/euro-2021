import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import WinnerChoice from './WinnerChoice'

import './Winner.scss'

const Winner = ({ team, saveWinner }) => {
  const [selectedTeam, setSelectedTeam] = useState(team)

  useEffect(() => {
    setSelectedTeam(team)
  }, [team])

  const handleChange = (e) => {
    setSelectedTeam(e.target.value)
    saveWinner(e.target.value)
  }

  return (
    <Card className="winner-card">
      <Typography className="winner-typo" gutterBottom variant="h1" component="h2">
        Choix du vainqueur final
      </Typography>
      <Typography className="winner-typo" color="textSecondary">
        Quel pays gagnera la coupe du monde ?
      </Typography>
      <CardContent>
        <WinnerChoice userTeam={selectedTeam} onValueChange={handleChange} />
      </CardContent>
    </Card>
  )
}


Winner.propTypes = {
  team: PropTypes.string,
  saveWinner: PropTypes.func.isRequired,
}

Winner.defaultProps = {
  team: '',
}

export default Winner
