import chunk from 'lodash/chunk'
import isEmpty from 'lodash/isEmpty'
import keyBy from 'lodash/keyBy'
import { useEffect, useMemo, useState } from 'react'
import { useFirestore } from 'reactfire'

export const useBatchedMultiGet = (ids, collection) => {
  const idChunks = useMemo(() => chunk(ids, 10), [ids])
  const [entities, setEntities] = useState({})
  const firestore = useFirestore()
  const { FieldPath } = useFirestore

  useEffect(() => {
    if (isEmpty(ids)) return

    const unsubscribes = idChunks.map((idChunk) =>
      firestore
        .collection(collection)
        .where(FieldPath.documentId(), 'in', idChunk)
        .onSnapshot((snap) => {
          const addedEntities = keyBy(snap.docs, 'id')
          setEntities((currentEntities) => ({
            ...currentEntities,
            ...addedEntities,
          }))
        }),
    )

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe())
  }, [firestore, idChunks, FieldPath, ids, collection])

  return useMemo(
    () => Object.values(entities).filter((u) => ids.includes(u.id)),
    [entities, ids],
  )
}
