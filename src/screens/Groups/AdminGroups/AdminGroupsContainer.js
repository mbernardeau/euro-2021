import { compose } from 'redux'
import loader from 'hoc-react-loader'
import { connect } from 'react-redux'
import {
  getGroupsForUserAdmin,
  fetchGroupsForUserAdmin,
} from '../../../redux/groups'

import AdminGroups from './AdminGroups'

const mapState = (state) => ({
  groups: getGroupsForUserAdmin(state),
})

const mapDispatch = (dispatch) => ({
  load: () => dispatch(fetchGroupsForUserAdmin()),
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['groups'] }),
)(AdminGroups)
