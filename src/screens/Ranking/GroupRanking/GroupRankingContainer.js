import { connect } from 'react-redux'
import keys from 'lodash/keys'
import compact from 'lodash/compact'
import orderBy from 'lodash/orderBy'
import usersFactory, { fetchUsers } from '../../../redux/users'
import { getUserId } from '../../../redux/user'

import GroupRanking from './GroupRanking'

const mapState = (state, { members }) => ({
  users: orderBy(
    compact(usersFactory.get(keys(members))(state)),
    ({ score }) => score || 0,
    'desc',
  ),
  userId: getUserId(state),
})

const mapDispatch = (dispatch) => ({
  load: (members) => dispatch(fetchUsers(members)),
})

export default connect(mapState, mapDispatch)(GroupRanking)
