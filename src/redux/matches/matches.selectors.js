import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'
import { createSelector } from 'reselect'
import moment from 'moment'

import matchesFactory from './matches.reducer'

export const getFutureMatches = createSelector(
  matchesFactory.get(),
  (matches) => {
    const now = moment()
    return orderBy(
      filter(matches, (match) => moment(match.dateTime).isAfter(now)),
      [({ dateTime }) => moment(dateTime)],
    )
  },
)

export const getFinishedMatches = createSelector(
  matchesFactory.get(),
  (matches) => {
    const now = moment()
    return orderBy(
      filter(matches, (match) => moment(match.dateTime).isBefore(now)),
      [({ dateTime }) => moment(dateTime)],
      ['desc'],
    )
  },
)
