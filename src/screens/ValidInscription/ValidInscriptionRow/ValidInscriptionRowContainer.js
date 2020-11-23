import { compose } from 'redux'
import loader from 'hoc-react-loader'
import { connect } from 'react-redux'
import usersFactory, { fetchUser } from '../../../redux/users'
import { validApply } from '../../../redux/groups'

import ValidInscriptionRow from './ValidInscriptionRow'

const mapState = (state, { userId }) => ({
  user: usersFactory.get(userId)(state),
})

const mapDispatch = (dispatch, { userId, id }) => ({
  load: () => dispatch(fetchUser(userId)),
  validApply: () => {
    dispatch(validApply(id, userId))
  },
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['user'] }),
)(ValidInscriptionRow)
