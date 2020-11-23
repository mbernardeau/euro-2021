import { lazyload } from 'react-lazyload'
import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader'

import betReducer, { fetchBet, saveBet } from '../../../redux/bets'
import teamsReducer, { fetchTeam } from '../../../redux/teams'

import Match from './Match'

const mapState = (state, { matchId, match: { teamA, teamB } }) => ({
  bet: betReducer.get(matchId)(state),
  teamA: teamsReducer.get(teamA)(state),
  teamB: teamsReducer.get(teamB)(state),
})

const mapDispatch = (dispatch, { matchId, match: { teamA, teamB } }) => ({
  load: () => {
    dispatch(fetchBet(matchId))
    dispatch(fetchTeam(teamA))
    dispatch(fetchTeam(teamB))
  },
  saveBet: (bet) => {
    dispatch(saveBet(matchId, bet))
  },
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['bet', 'teamA', 'teamB'] }),
  lazyload({
    height: 135,
    once: true,
    offset: 300,
  }),
)(Match)
