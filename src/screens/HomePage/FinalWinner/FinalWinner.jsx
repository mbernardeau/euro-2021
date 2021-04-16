import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React, { Suspense } from 'react'
import { useSelectedWinner, useCompetitionStartDate } from '../../../hooks'
import './FinalWinner.scss'
import FinalWinnerChoice from './FinalWinnerChoice'
import isPast from 'date-fns/isPast'

const FinalWinner = () => {
  const [team, saveWinner] = useSelectedWinner()

  const CompetitionStartDate = new Date(
    useCompetitionStartDate().startDate.seconds * 1000,
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
          : 'Quel pays gagnera la coupe du monde ?'}
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
