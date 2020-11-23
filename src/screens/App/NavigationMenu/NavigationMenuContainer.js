import { connect } from 'react-redux'
import { compose } from 'redux'

import { closeMenu, getMenuOpen } from '../../../redux/nav'

import { withRouter } from 'react-router'

import NavigationMenu from './NavigationMenu'

export default compose(
  connect(
    (state) => ({
      open: getMenuOpen(state),
    }),
    (dispatch) => ({
      closeMenu: () => dispatch(closeMenu()),
    }),
  ),
  withRouter,
)(NavigationMenu)
