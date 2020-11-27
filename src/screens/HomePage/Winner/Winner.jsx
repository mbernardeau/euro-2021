import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { SuspenseWithPerf } from 'reactfire'
import { useSelectedWinner } from '../../../hooks'
import './Winner.scss'
import WinnerChoice from './WinnerChoice'

const Winner = () => {
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
        <SuspenseWithPerf fallback={<></>} traceId="winner-choice">
          <WinnerChoice userTeam={team} onValueChange={handleChange} />
        </SuspenseWithPerf>
      </CardContent>
    </Card>
  )
}

Winner.propTypes = {}

Winner.defaultProps = {}

export default Winner
