import { connect } from 'react-redux'
import { createGroup } from '../../../redux/groups'

import CreateGroup from './CreateGroup'

const mapDispatch = (dispatch) => ({
  createGroup: (group) => dispatch(createGroup(group)),
})

export default connect(undefined, mapDispatch)(CreateGroup)
