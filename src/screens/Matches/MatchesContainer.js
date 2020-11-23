import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader'
import {
  fetchMatchList,
  getFinishedMatches,
  getFutureMatches,
} from '../../redux/matches'

import Matches from './Matches'

const mapState = (state) => ({
  futureMatches: getFutureMatches(state),
  finishedMatches: getFinishedMatches(state),
})

const mapDispatch = (dispatch) => ({
  load: () => dispatch(fetchMatchList()),
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['futureMatches', 'finishedMatches'] }),
)(Matches)
