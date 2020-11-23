import { connect } from 'react-redux'
import loader from 'hoc-react-loader'
import { compose } from 'redux'
import { getGroupsForUser, fetchGroupsForUser } from '../../../redux/groups'
import { getUserId } from '../../../redux/user'

import MyGroups from './MyGroups'

const mapState = (state) => ({
  groups: getGroupsForUser(state),
  userId: getUserId(state),
})

const mapDispatch = (dispatch) => ({
  load: () => dispatch(fetchGroupsForUser()),
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['groups'] }),
)(MyGroups)
