import { useBatchedMultiGet } from './utils'

export const useUsers = (userIds) => {
  return useBatchedMultiGet(userIds, 'users')
}
