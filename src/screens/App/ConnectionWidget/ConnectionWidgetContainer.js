import { connect } from 'react-redux'

import { getProfile, getAuth, getAuthError } from '../../../redux/user'

import ConnectionWidget from './ConnectionWidget'

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
  auth: getAuth(state),
  user: getProfile(state),
})

export default connect(mapStateToProps)(ConnectionWidget)
