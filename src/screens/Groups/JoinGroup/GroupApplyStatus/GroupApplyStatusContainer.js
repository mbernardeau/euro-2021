import { connect } from 'react-redux'

import { resetGroupApplyStatus } from '../../../../redux/ui'

import GroupApplyStatus from './GroupApplyStatus'

const mapState = (state) => ({
  ...state.ui.groupapply,
})

const mapDispatch = (dispatch) => ({
  handleClose: () => dispatch(resetGroupApplyStatus()),
})

export default connect(mapState, mapDispatch)(GroupApplyStatus)
