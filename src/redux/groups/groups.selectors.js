import { createSelector } from 'reselect'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import keyBy from 'lodash/keyBy'
import groupsReducer from './groups'
import { getUserId } from '../user'

export const getGroupsForUserAdmin = state =>
  groupsReducer.getBy('createdBy', getUserId(state))(state)

export const getGroupsForUserMember = createSelector(
  getUserId,
  groupsReducer.get(),
  (userId, groups) => filter(groups, g => g.members && g.members[userId]),
)

export const getGroupsForUserAwaitingMember = createSelector(
  getUserId,
  groupsReducer.get(),
  (userId, groups) => filter(groups, g => !isEmpty(g.awaitingMembers)),
)

export const getGroupsForUser = createSelector(
  getGroupsForUserMember,
  getGroupsForUserAwaitingMember,
  (groupsMember, groupsAwaiting) => ({
    ...keyBy(groupsMember, 'id'),
    ...keyBy(groupsAwaiting, 'id'),
  }),
)

export const getGroupsContainingAwaitingMembers = createSelector(
  groupsReducer.get(),
  groups => filter(groups, g => g.awaitingMembers && Object.keys(g.awaitingMembers).length),
)