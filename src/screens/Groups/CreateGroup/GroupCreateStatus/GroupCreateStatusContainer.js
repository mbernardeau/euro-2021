import { connect } from 'react-redux'

import { resetGroupCreateStatus } from '../../../../redux/ui'

import GroupCreateStatus from './GroupCreateStatus'

const mapState = state => ({
  ...state.ui.groupcreate,
})

const mapDispatch = dispatch => ({
  handleClose: () => dispatch(resetGroupCreateStatus()),
})

export default connect(mapState, mapDispatch)(GroupCreateStatus)
