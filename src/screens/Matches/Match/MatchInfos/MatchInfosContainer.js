import { lazyload } from 'react-lazyload'
import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader'

import stadiumsReducer, { fetchStadium } from '../../../../redux/stadiums'

import MatchInfos from './MatchInfos'

const mapState = (state, { match: { stadium } }) => ({
  stadium: stadiumsReducer.get(stadium)(state),
})

const mapDispatch = (dispatch, { match: { stadium } }) => ({
  load: () => {
    dispatch(fetchStadium(stadium))
  },
})

export default compose(
  connect(mapState, mapDispatch),
  loader({}),
  lazyload({
    height: 135,
    once: true,
    offset: 300,
  }),
)(MatchInfos)
