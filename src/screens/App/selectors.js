import { createSelector } from 'reselect'

const selectRoute = (state) => state.router

const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) => routeState.location)

export { makeSelectLocation }
