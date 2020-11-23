import { compose } from 'redux'
import loader from 'hoc-react-loader'
import { connect } from 'react-redux'
import { getGroupsContainingAwaitingMembers, fetchGroupsContainingAwaitingMember } from '../../redux/groups'

import ValidInscription from './ValidInscription'

const mapState = state => ({
  groups: getGroupsContainingAwaitingMembers(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchGroupsContainingAwaitingMember()),
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['groups'] }))(ValidInscription)
