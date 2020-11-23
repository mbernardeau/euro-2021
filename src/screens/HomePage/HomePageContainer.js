import { connect } from 'react-redux'
import { getProfile } from '../../redux/user'

import HomePage from './HomePage'

export default connect(state => ({
  user: getProfile(state),
}))(HomePage)
