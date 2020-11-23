import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader'
import usersFactory, { fetchUser } from '../../redux/users'

import Avatar from './Avatar'

const mapState = (state, { userId }) => ({
  ...usersFactory.get(userId)(state),
})

const mapDispatch = (dispatch, { userId }) => ({
  load: () => dispatch(fetchUser(userId)),
})

export default compose(connect(mapState, mapDispatch), loader({}))(Avatar)
