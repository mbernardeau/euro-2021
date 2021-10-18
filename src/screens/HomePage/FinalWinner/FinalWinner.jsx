import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import isPast from 'date-fns/isPast'
import { Suspense, useCallback, useMemo } from 'react'
import { useSelectedWinner } from '../../../hooks/winner'
import { useCompetitionData } from '../../../hooks/competition'
import './FinalWinner.scss'
import FinalWinnerChoice from './FinalWinnerChoice'

const FinalWinner = () => {
  const [team, saveWinner] = useSelectedWinner()

  const competitionData = useCompetitionData()

  const CompetitionStartDate = useMemo(
    () => new Date(competitionData.startDate.seconds * 1000),
    [competitionData.startDate.seconds],
  )

  const handleChange = useCallback(
    (e) => {
      saveWinner(e.target.value)
    },
    [saveWinner],
  )

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
