import { connect } from 'react-redux'
import { getUserId } from '../../../../redux/user'

import GroupRow from './GroupRow'

const mapState = state => ({
  userId: getUserId(state),
})

export default connect(mapState)(GroupRow)
