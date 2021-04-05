import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React, { Suspense } from 'react'
import { useSelectedWinner } from '../../../hooks'
import './FinalWinner.scss'
import FinalWinnerChoice from './FinalWinnerChoice'

const FinalWinner = () => {
  const [team, saveWinner] = useSelectedWinner()

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
        Choix du vainqueur final
      </Typography>
      <Typography className="winner-typo" color="textSecondary">
        Quel pays gagnera la coupe du monde ?
      </Typography>
      <CardContent>
        <Suspense fallback={<></>}>
          <FinalWinnerChoice userTeam={team} onValueChange={handleChange} />
        </Suspense>
      </CardContent>
    </Card>
  )
}

FinalWinner.propTypes = {}

FinalWinner.defaultProps = {}

export default FinalWinner
