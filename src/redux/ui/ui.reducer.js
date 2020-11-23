import {
  APPLY_GROUP_FAILED,
  APPLY_GROUP_SUCCESS,
  CREATE_GROUP_FAILED,
  CREATE_GROUP_SUCCESS,
} from '../groups'

import {
  RESET_GROUP_APPLY_STATUS,
  RESET_GROUP_CREATE_STATUS,
} from './ui.actions'

const initialState = {}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_GROUP_FAILED:
      return {
        ...state,
        groupapply: {
          status: 'failed',
          reason: action.reason,
        },
      }
    case APPLY_GROUP_SUCCESS:
      return {
        ...state,
        groupapply: {
          status: 'success',
          group: action.group,
        },
      }
    case RESET_GROUP_APPLY_STATUS:
      return {
        ...state,
        groupapply: {},
      }
    case CREATE_GROUP_FAILED:
      return {
        ...state,
        groupapply: {
          status: 'failed',
          reason: action.reason,
        },
      }
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        groupcreate: {
          status: 'success',
          group: action.group,
        },
      }
    case RESET_GROUP_CREATE_STATUS:
      return {
        ...state,
        groupcreate: {},
      }
    default:
      return state
  }
}

export default uiReducer
