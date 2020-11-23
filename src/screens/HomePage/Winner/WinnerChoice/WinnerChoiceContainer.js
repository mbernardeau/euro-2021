import { compose } from 'redux'
import loader from 'hoc-react-loader'
import { connect } from 'react-redux'

import orderBy from 'lodash/orderBy'

import teamsReducer, { fetchTeams } from '../../../../redux/teams'

import WinnerChoice from './WinnerChoice'

const mapState = state => ({
  teams: orderBy(
    teamsReducer.get()(state),
    ['winOdd'],
    'asc',
  ),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(fetchTeams()),
})

export default compose(connect(mapState, mapDispatch), loader({ print: ['teams'] }))(WinnerChoice)
