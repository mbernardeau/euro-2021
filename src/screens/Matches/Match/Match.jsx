import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import conformsTo from 'lodash/conformsTo'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useBet, useTeam } from '../../../hooks'
import Bet from './Bet'
import ChoiceWinner from './ChoiceWinner'
import './Match.scss'
import MatchInfos from './MatchInfos'
import Odds from './Odds'
import PointsWon from './PointsWon'
import PointsWonPhase from './PointsWonPhase'
import Scores from './Scores'
import ValidIcon from './ValidIcon'

const empty = {}
const scoreValidator = (score) => isNumber(score) && score >= 0
const winnerValidator = (winner) => winner && (winner === 'A' || winner === 'B')

const Match = ({ matchSnapshot }) => {
  const [bet, saveBet] = useBet(matchSnapshot.id)
  const [currentBet, setCurrentBet] = useState(bet)

  const match = matchSnapshot.data()
  const teamA = useTeam(match.teamA)
  const teamB = useTeam(match.teamB)

  useEffect(() => {
    setCurrentBet(bet)
  }, [bet])

  const past = match.dateTime.toMillis() < Date.now()

  const isBetValid = (updatedBet) => {
    if (
      !conformsTo(updatedBet, {
        betTeamA: scoreValidator,
        betTeamB: scoreValidator,
      })
    ) {
      return false
    }

    return match.phase === '0'
      ? true
      : updatedBet.betTeamA !== updatedBet.betTeamB ||
          conformsTo(updatedBet, {
            betWinner: winnerValidator,
          })
  }

  const handleChange = (team) => ({ target: { value } }) => {
    const updatedBet = {
      ...currentBet,
      [`betTeam${team}`]: value,
    }
    setCurrentBet(updatedBet)
    saveBetIfValid(updatedBet)
  }

  const handleTeamAChange = handleChange('A')
  const handleTeamBChange = handleChange('B')

  const handleWinnerChoiceChange = ({ target: { value } }) => {
    const updatedBet = {
      ...currentBet,
      betWinner: value,
    }
    setCurrentBet(updatedBet)
    saveBetIfValid(updatedBet)
  }

  const saveBetIfValid = (updatedBet) => {
    if (isBetValid(updatedBet)) {
      saveBet(updatedBet)
    }
  }

  const displayChoiceWinner = ({ betTeamA, betTeamB }) =>
    !isNil(betTeamA) && !isNil(betTeamB) && betTeamA === betTeamB

  const betSaved = () =>
    isBetValid(currentBet) &&
    currentBet.betTeamA === bet.betTeamA &&
    currentBet.betTeamB === bet.betTeamB &&
    currentBet.betWinner === bet.betWinner

  return (
    (match.phase === '0' || match.display) && (
      <>
        <Card className="match-card">
          <CardContent className="match-content">
            <div className="match-teams">
              <Bet
                team={teamA}
                betValue={currentBet.betTeamA}
                onBetValueUpdated={handleTeamAChange}
                past={past}
              />
              <Bet
                team={teamB}
                betValue={currentBet.betTeamB}
                onBetValueUpdated={handleTeamBChange}
                past={past}
              />
            </div>
            {match.phase !== '0' && displayChoiceWinner(bet) && (
              <ChoiceWinner
                teamA={teamA}
                teamB={teamB}
                betValue={bet.betWinner}
                onBetValueUpdated={handleWinnerChoiceChange}
                past={past}
              />
            )}
            {!past && (
              <Odds
                {...match.odds}
                phase={match.phase}
                teamA={teamA}
                teamB={teamB}
              />
            )}
            {past && <Scores {...match} />}
            {past &&
              (match.phase === '0' ? (
                <PointsWon {...match} {...bet} />
              ) : (
                <PointsWonPhase {...match} {...bet} />
              ))}
            <Divider />
            <MatchInfos match={match} />
            {!past && <ValidIcon valid={betSaved()} />}
          </CardContent>
        </Card>
      </>
    )
  )
}

Match.defaultProps = {
  match: {},
  bet: empty,
}

Match.propTypes = {
  match: PropTypes.shape({
    dateTime: PropTypes.shape({
      toDate: PropTypes.func.isRequired,
    }).isRequired,
    phase: PropTypes.string.isRequired,
    scores: PropTypes.shape({}),
  }),
}

export default Match
