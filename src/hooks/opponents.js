import chunk from 'lodash/chunk'
import isEmpty from 'lodash/isEmpty'
import keyBy from 'lodash/keyBy'
import { useEffect, useMemo, useState } from 'react'
import { useFirestore } from 'reactfire'

export const useOpponents = (userIds) => {
  const idChunks = useMemo(() => chunk(userIds, 10), [userIds])
  const [opponents, setOpponents] = useState({})
  const firestore = useFirestore()
  const { FieldPath } = useFirestore

  useEffect(() => {
    if (isEmpty(userIds)) return

    const unsubscribes = idChunks.map((idChunk) =>
      firestore
        .collection('opponents')
        .where(FieldPath.documentId(), 'in', idChunk)
        .onSnapshot((snap) => {
          const addedUsers = keyBy(snap.docs, 'id')
          setOpponents((currentUsers) => ({ ...currentUsers, ...addedUsers }))
        }),
    )

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe())
  }, [firestore, userIds, idChunks, FieldPath])

  return useMemo(
    () => Object.values(opponents).filter((u) => userIds.includes(u.id)),
    [opponents, userIds],
  )
}
