import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  getGroupsForUserMember,
  fetchGroupsForUserMember,
} from '../../redux/groups'

import loader from 'hoc-react-loader'

import Ranking from './Ranking'

const mapState = (state) => ({
  groups: getGroupsForUserMember(state),
})

const mapDispatch = (dispatch) => ({
  load: () => dispatch(fetchGroupsForUserMember()),
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['groups'] }),
)(Ranking)
