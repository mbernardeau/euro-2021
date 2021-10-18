import chunk from 'lodash/chunk'
import isEmpty from 'lodash/isEmpty'
import keyBy from 'lodash/keyBy'
import { useEffect, useMemo, useState } from 'react'
import {
  documentId,
  collection,
  query,
  where,
  onSnapshot,
} from '@firebase/firestore'
import { useFirestore } from 'reactfire'

export const useBatchedMultiGet = (ids, collectionName) => {
  const idChunks = useMemo(() => chunk(ids, 10), [ids])
  const [entities, setEntities] = useState({})
  const firestore = useFirestore()

  useEffect(() => {
    if (isEmpty(ids)) return

    const collectionRef = collection(firestore, collectionName)

    const unsubscribes = idChunks.map((idChunk) => {
      const queryRef = query(collectionRef, where(documentId(), 'in', idChunk))
      return onSnapshot(queryRef, (snap) => {
        const addedEntities = keyBy(snap.docs, 'id')
        setEntities((currentEntities) => ({
          ...currentEntities,
          ...addedEntities,
        }))
      })
    })

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe())
  }, [firestore, idChunks, ids, collectionName])

  return useMemo(
    () => Object.values(entities).filter((u) => ids.includes(u.id)),
    [entities, ids],
  )
}
