import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader'
import stadiumsFactory, { fetchStadiumsList } from 'redux/stadiums'

import Stadiums from './Stadiums'

const mapState = state => ({
  stadiums: stadiumsFactory.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchStadiumsList()),
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['stadiums'] }))(Stadiums)
