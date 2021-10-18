import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import conformsTo from 'lodash/conformsTo'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useBet } from '../../../hooks/bets'
import { useTeam } from '../../../hooks/teams'
import Bet from './Bet'
import ChoiceWinner from './ChoiceWinner'
import InformationMatch from './InformationMatch'
import InformationResult from './InformationResult'
import './Match.scss'
import MatchInfos from './MatchInfos'
import Odds from './Odds'
import PointsWon from './PointsWon'
import Scores from './Scores'
import ValidIcon from './ValidIcon'

const empty = {}
const scoreValidator = (score) => isNumber(score) && score >= 0
const winnerValidator = (winner) => winner && (winner === 'A' || winner === 'B')

const proxiColors = ['#BAEE90', '#E0EE90', '#EEEE90', '#EEDD90', '#EEC590']

const getBackgroundColor = (proxiLevel, pointsWon) => {
  // No bet ?
  const hasBet = isNumber(pointsWon)

  if (!hasBet) return 'lightgrey'
  return isNil(proxiLevel) ? '#EEAB90' : proxiColors[proxiLevel]
}

const Match = ({ matchSnapshot }) => {
  const [bet, saveBet] = useBet(matchSnapshot.id)
  const [currentBet, setCurrentBet] = useState(bet)

  const match = matchSnapshot.data()
  const teamA = useTeam(match.teamA)
  const teamB = useTeam(match.teamB)

  useEffect(() => {
    setCurrentBet(bet)
  }, [bet])

  const past = match.dateTime.toMillis() <= Date.now()

  const isBetValid = (updatedBet) => {
    if (
      !conformsTo(updatedBet, {
        betTeamA: scoreValidator,
        betTeamB: scoreValidator,
      })
    ) {
      return false
    }

    if (match.phase !== '0' && !updatedBet.betWinner) {
      /* Default winner is A when we bet a draw */
      updatedBet.betWinner = 'A'
    }

    return match.phase === '0'
      ? true
      : updatedBet.betTeamA !== updatedBet.betTeamB ||
          conformsTo(updatedBet, {
            betWinner: winnerValidator,
          })
  }

  const handleChange =
    (team) =>
    ({ target: { value } }) => {
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
    match.display && (
      <>
        <Card className="match-card">
          <CardContent
            className="match-content"
            style={{
              backgroundColor:
                past &&
                getBackgroundColor(currentBet.proxi, currentBet.pointsWon),
            }}
          >
            <div className="match-teams">
              <Bet
                team={teamA}
                betValue={currentBet.betTeamA}
                onBetValueUpdated={handleTeamAChange}
                past={past}
              />
              <div className="points-odds-container">
                {!past && (
                  <Odds
                    name_teamA={teamA.name}
                    name_teamB={teamB.name}
                    bet_teamA={currentBet.betTeamA}
                    bet_teamB={currentBet.betTeamB}
                    odds={match.odds}
                  />
                )}
                {past && <Scores {...match} />}
                {past && <PointsWon {...match} {...bet} />}
              </div>
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
            <Divider />
            <MatchInfos match={match} />
            <InformationMatch phase={match.phase} group={teamA.group} />
            {past ? (
              <InformationResult {...bet} />
            ) : (
              <ValidIcon valid={betSaved()} />
            )}
          </CardContent>
        </Card>
      </>
    )
  )
}

Match.defaultProps = {
  match: empty,
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
