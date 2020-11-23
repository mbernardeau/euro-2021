import { connect } from 'react-redux'
import { toggleMenu } from '../../redux/nav'

import App from './App'

export default connect(
  ({ firebase: { profile }, router: { location } }) => ({
    user: profile,
    location,
  }),
  (dispatch) => ({
    toggleMenu: () => dispatch(toggleMenu()),
  }),
)(App)
