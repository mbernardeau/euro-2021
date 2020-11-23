import { createSelector } from 'reselect'

export const getFirebase = state => state.firebase

export const getData = createSelector(getFirebase, ({ data }) => data)
