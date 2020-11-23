import React, { Fragment, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import conformsTo from 'lodash/conformsTo'
import isNumber from 'lodash/isNumber'
import isNil from 'lodash/isNil'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'

import Odds from './Odds'
import Bet from './Bet'
import ChoiceWinner from './ChoiceWinner'
import ValidIcon from './ValidIcon'
import MatchInfos from './MatchInfos'
import Scores from './Scores'
import PointsWon from './PointsWon'
import PointsWonPhase from './PointsWonPhase'

import './Match.scss'

const empty = {}
const scoreValidator = (score) => isNumber(score) && score >= 0
const winnerValidator = (winner) => winner && (winner === 'A' || winner === 'B')

const Match = ({ bet, match, saveBet, teamA, teamB }) => {
  const [currentBet, setCurrentBet] = useState(bet)

  useEffect(() => {
    setCurrentBet(bet)
  }, [bet])

  const past = moment(match.dateTime).isBefore(new Date())

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
      <Fragment>
        <Card className="match-card">
          <CardContent className="match-content">
            <div className="match-teams">
              <Bet
                team={teamA}
                betValue={bet.betTeamA}
                onBetValueUpdated={handleTeamAChange}
                past={past}
              />
              <Bet
                team={teamB}
                betValue={bet.betTeamB}
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
      </Fragment>
    )
  )
}

Match.defaultProps = {
  match: {},
  teamA: {},
  teamB: {},
  bet: empty,
}

Match.propTypes = {
  match: PropTypes.shape({
    dateTime: PropTypes.instanceOf(Date).isRequired,
    phase: PropTypes.string.isRequired,
    scores: PropTypes.shape({}),
  }),
  teamA: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  teamB: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  bet: PropTypes.shape({
    betTeamA: PropTypes.number,
    betTeamB: PropTypes.number,
    betWinner: PropTypes.string,
  }),
  saveBet: PropTypes.func.isRequired,
}

export default Match
