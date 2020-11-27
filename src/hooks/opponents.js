import chunk from 'lodash/chunk'
import isEmpty from 'lodash/isEmpty'
import keyBy from 'lodash/keyBy'
import { useEffect, useMemo, useState } from 'react'
import { useFirestore } from 'reactfire'

export const useOpponents = (userIds) => {
  const usersChunks = useMemo(() => chunk(userIds, 10), [userIds])
  const [users, setUsers] = useState({})
  const firestore = useFirestore()

  useEffect(() => {
    if (isEmpty(userIds)) return

    const unsubscribes = usersChunks.map((idChunk) =>
      firestore
        .collection('users')
        .where('uid', 'in', idChunk)
        .onSnapshot((snap) => {
          const addedUsers = keyBy(snap.docs, 'uid')
          setUsers((currentUsers) => ({ ...currentUsers, ...addedUsers }))
        }),
    )

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe())
  }, [firestore, userIds, usersChunks])

  return Object.values(users)
}
