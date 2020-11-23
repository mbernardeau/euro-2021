import React, { Component, Fragment } from 'react'

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

class Match extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bet: this.props.bet,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.bet || this.state.bet === empty) {
      this.setState({
        bet: nextProps.bet || empty,
      })
    }
  }

  isBetValid = () => {
    const scoreValidator = score => isNumber(score) && score >= 0
    const winnerValidator = winner => winner && (winner === 'A' || winner === 'B')

    if (
      !conformsTo(this.state.bet, {
        betTeamA: scoreValidator,
        betTeamB: scoreValidator,
      })
    )
      return false

    return this.props.match.phase === '0'
      ? true
      : this.state.bet.betTeamA !== this.state.bet.betTeamB ||
      conformsTo(this.state.bet, {
        betWinner: winnerValidator,
      })
  }

  handleChange = team => ({ target: { value } }) => {
    this.setState(
      {
        bet: {
          ...this.state.bet,
          [`betTeam${team}`]: value,
        },
      },
      this.saveBetIfValid,
    )
  }

  handleWinnerChoiceChange = ({ target: { value } }) => {
    this.setState(
      {
        bet: {
          ...this.state.bet,
          [`betWinner`]: value,
        },
      },
      this.saveBetIfValid,
    )
  }

  saveBetIfValid = () => {
    if (this.isBetValid()) {
      this.props.saveBet(this.state.bet)
    }
  }

  displayChoiceWinner = ({ betTeamA, betTeamB }) =>
    !isNil(betTeamA) && !isNil(betTeamB) && betTeamA === betTeamB

  betSaved = () =>
    this.isBetValid() &&
    this.state.bet.betTeamA === this.props.bet.betTeamA &&
    this.state.bet.betTeamB === this.props.bet.betTeamB &&
    this.state.bet.betWinner === this.props.bet.betWinner

  handleTeamAChange = this.handleChange('A')
  handleTeamBChange = this.handleChange('B')

  render() {
    const { match, teamA, teamB } = this.props
    const { bet } = this.state
    const past = moment(match.dateTime).isBefore(new Date())

    return (
      (match.phase === '0' || match.display) && (
        <Fragment>
          <Card className="match-card">
            <CardContent className="match-content">
              <div className="match-teams">
                <Bet
                  team={teamA}
                  betValue={bet.betTeamA}
                  onBetValueUpdated={this.handleTeamAChange}
                  past={past}
                />
                <Bet
                  team={teamB}
                  betValue={bet.betTeamB}
                  onBetValueUpdated={this.handleTeamBChange}
                  past={past}
                />
              </div>
              {match.phase !== '0' &&
                this.displayChoiceWinner(bet) && (
                  <ChoiceWinner
                    teamA={teamA}
                    teamB={teamB}
                    betValue={bet.betWinner}
                    onBetValueUpdated={this.handleWinnerChoiceChange}
                    past={past}
                  />
                )}
              {!past && <Odds {...match.odds} phase={match.phase} teamA={teamA} teamB={teamB} />}
              {past && <Scores {...match} />}
              {past &&
                (match.phase === '0' ? (
                  <PointsWon {...match} {...bet} />
                ) : (
                    <PointsWonPhase {...match} {...bet} />
                  ))}
              <Divider />
              <MatchInfos match={match} />
              {!past && <ValidIcon valid={this.betSaved()} />}
            </CardContent>
          </Card>
        </Fragment>
      )
    )
  }
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
