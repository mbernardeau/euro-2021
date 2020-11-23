import { connect } from 'react-redux'
import { compose } from 'redux'

import { applyInGroup } from '../../../redux/groups'

import JoinGroup from './JoinGroup'

export default compose(
  connect(undefined, dispatch => ({
    applyInGroup: code => dispatch(applyInGroup(code)),
  })),
)(JoinGroup)
