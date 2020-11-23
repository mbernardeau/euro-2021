import { createSelector } from 'reselect'

import { getFirebase } from '../firebase'

export const getProfile = createSelector(getFirebase, ({ profile }) => profile)

export const getAuth = createSelector(getFirebase, ({ auth }) => auth || {})

export const getAuthError = createSelector(
  getFirebase,
  ({ authError }) => authError,
)

export const getUserId = createSelector(getAuth, ({ uid }) => uid)
