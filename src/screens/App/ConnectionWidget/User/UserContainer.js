import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import betFactory from '../../../../redux/bets'
import { getProfile } from '../../../../redux/user'
import { withRouter } from 'react-router'

import User from './User'

const mapState = (state) => ({
  user: getProfile(state),
})

const mapDispatch = (dispatch, { firebase: { logout }, history }) => ({
  logout: () => {
    logout()
    dispatch(betFactory.reset())
    history.push('/')
  },
})

export default compose(
  withRouter,
  firebaseConnect(),
  connect(mapState, mapDispatch),
)(User)
