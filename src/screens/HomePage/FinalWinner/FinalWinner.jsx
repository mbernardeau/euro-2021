import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React, { Suspense } from 'react'
import { useSelectedWinner, useCompetitionData } from '../../../hooks'
import './FinalWinner.scss'
import FinalWinnerChoice from './FinalWinnerChoice'
import isPast from 'date-fns/isPast'

const FinalWinner = () => {
  const [team, saveWinner] = useSelectedWinner()

  const CompetitionStartDate = new Date(
    useCompetitionData().startDate.seconds * 1000,
  )

  const handleChange = (e) => {
    saveWinner(e.target.value)
  }

  return (
    <Card className="winner-card">
      <Typography
        className="winner-typo"
        gutterBottom
        variant="h1"
        component="h2"
      >
        {isPast(CompetitionStartDate)
          ? 'Votre vainqueur final'
          : 'Choix du vainqueur final'}
      </Typography>
      <Typography className="winner-typo" color="textSecondary">
        {isPast(CompetitionStartDate)
          ? 'Vous avez parié pour :'
          : "Quel pays gagnera l'EURO 2021 ?"}
      </Typography>
      <CardContent>
        <Suspense fallback={<></>}>
          <FinalWinnerChoice
            userTeam={team}
            disabled={isPast(CompetitionStartDate)}
            onValueChange={handleChange}
          />
        </Suspense>
      </CardContent>
    </Card>
  )
}

FinalWinner.propTypes = {}

FinalWinner.defaultProps = {}

export default FinalWinner
