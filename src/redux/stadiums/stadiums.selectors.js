import { createSelector } from 'reselect'

import { getData } from '../firebase'

export const getStadiums = createSelector(getData, ({ stadiums }) => stadiums)
