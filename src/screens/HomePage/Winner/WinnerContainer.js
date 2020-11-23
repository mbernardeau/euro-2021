import { compose } from 'redux'
import { connect } from 'react-redux'

import Winner from './Winner'
import { getProfile } from '../../../redux/user'
import { saveWinner } from '../../../redux/users'

const mapState = state => ({
  team: getProfile(state).winnerTeam,
})

const mapDispatch = dispatch => ({
  saveWinner: team => {
    dispatch(saveWinner(team))
  },
})

export default compose(connect(mapState, mapDispatch))(Winner)
