import { connect } from 'react-redux'

import App from './App'

export default connect(({ firebase: { profile }, router: { location } }) => ({
  user: profile,
  location,
}))(App)
