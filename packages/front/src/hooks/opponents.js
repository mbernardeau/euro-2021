import { useBatchedMultiGet } from './utils'

export const useOpponents = (userIds) => {
  return useBatchedMultiGet(userIds, 'opponents')
}
