import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@firebase/firestore'
import { httpsCallable } from '@firebase/functions'
import { useSnackbar } from 'notistack'
import { useCallback } from 'react'
import {
  useAuth,
  useFirestore,
  useFirestoreCollection,
  useFunctions,
  useUser,
} from 'reactfire'
import { v4 as uuidv4 } from 'uuid'
import { useIsUserAdmin } from './user'

const priceValidationMessage = (price) => (
  <>
    Payer {price}€ sur la&nbsp;
    <a
      title="Site cagnotte"
      className="group-join-link"
      href="https://www.paypal.com/pools/c/8zxiGanwSa"
      target="_blank"
      rel="noreferrer"
    >
      cagnotte
    </a>
    &nbsp; pour valider votre inscription !
  </>
)

export const useCreateGroup = () => {
  const user = useUser().data
  const firestore = useFirestore()
  const { enqueueSnackbar } = useSnackbar()
  const [applyInGroup] = useApplyInGroup()

  return async (group) => {
    const joinKey = uuidv4().slice(0, 5).toUpperCase()
    const groupsCollection = collection(firestore, 'groups')
    await addDoc(groupsCollection, {
      ...group,
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      joinKey,
      version: 1,
    })

    await applyInGroup(joinKey)

    enqueueSnackbar(
      <>
        Groupe {group.name} créé avec le code <b>{joinKey}</b>.
      </>,
      { variant: 'success' },
    )
  }
}

export const useApplyInGroup = () => {
  const firestore = useFirestore()
  const user = useUser().data

  const { enqueueSnackbar } = useSnackbar()

  const applyFn = useCallback(
    async (joinKey) => {
      const groupsCollection = collection(firestore, 'groups')
      const groupsQuery = query(
        groupsCollection,
        where('joinKey', '==', joinKey),
      )

      const groupQuerySnapshot = await getDocs(groupsQuery)

      if (groupQuerySnapshot.empty) {
        enqueueSnackbar(
          <>
            Aucune tribu avec le code <b>{joinKey}</b> n'existe
          </>,
          {
            variant: 'error',
          },
        )
        return
      }

      const [groupSnapshot] = groupQuerySnapshot.docs
      const group = groupSnapshot.data()

      if (group.members?.includes(user.uid)) {
        enqueueSnackbar(
          <>
            Vous appartenez déjà à la tribu <b>{group.name}</b>
          </>,
          {
            variant: 'info',
          },
        )
        return
      }

      if (group.awaitingMembers?.includes(user.uid)) {
        enqueueSnackbar(
          <>
            Vous avez déjà fait une demande pour rejoindre la tribu&nbsp;
            <b>{group.name}</b>
          </>,
          { variant: 'info' },
        )
        return
      }

      // Send a request by writing in groupApply collection
      await setDoc(
        doc(
          collection(firestore, 'groupApply'),
          `${groupSnapshot.id}_${user.uid}`,
        ),
        {
          uid: user.uid,
          groupId: groupSnapshot.id,
          status: 'sent',
        },
      )

      if (group.price > 0) {
        enqueueSnackbar(
          <>
            Demande envoyée pour la tribu&nbsp;<b>{group.name}</b> !{' '}
            {priceValidationMessage(group.price)}
          </>,
          { variant: 'success' },
        )
      } else {
        enqueueSnackbar(
          <>
            Inscription dans la tribu&nbsp;<b>{group.name}</b> !
          </>,
          { variant: 'success' },
        )
      }
    },
    [enqueueSnackbar, firestore, user.uid],
  )

  return [applyFn]
}

export const useGroupsForUserMember = () => {
  const { uid } = useAuth().currentUser

  const firestore = useFirestore()
  const groupsCollection = collection(firestore, 'groups')
  const groupsQuery = query(
    groupsCollection,
    where('members', 'array-contains', uid),
  )

  return useFirestoreCollection(groupsQuery).data?.docs
}

export const useGroupsForUserAwaitingMember = () => {
  const { uid } = useAuth().currentUser

  const firestore = useFirestore()
  const groupsCollection = collection(firestore, 'groups')
  const groupsQuery = query(
    groupsCollection,
    where('awaitingMembers', 'array-contains', uid),
  )

  return useFirestoreCollection(groupsQuery).data?.docs
}

export const useGroupsForUser = () => {
  const groupsMember = useGroupsForUserMember()
  const groupsAwaitingMember = useGroupsForUserAwaitingMember()

  return [...groupsMember, ...groupsAwaitingMember]
}

export const useGroupCreatedByUser = () => {
  const { uid } = useAuth().currentUser

  const firestore = useFirestore()
  const groupsCollection = collection(firestore, 'groups')
  const groupsQuery = query(groupsCollection, where('createdBy', '==', uid))

  return useFirestoreCollection(groupsQuery).data?.docs
}

export const useGroupsContainingAwaitingMembers = () => {
  const isAdmin = useIsUserAdmin()
  if (!isAdmin) {
    throw new Error(
      'useGroupsContainingAwaitingMembers can only be used by admins',
    )
  }

  const firestore = useFirestore()
  const groupsCollection = collection(firestore, 'groups')
  const groupsQuery = query(
    groupsCollection,
    where('awaitingMembers', '!=', []),
  )

  return useFirestoreCollection(groupsQuery).data?.docs
}

export const useValidApply = (groupId, userId) => {
  const isAdmin = useIsUserAdmin()
  if (!isAdmin) {
    throw new Error('useValidApply can only be used by admins')
  }
  const { enqueueSnackbar } = useSnackbar()

  const functions = useFunctions()
  const validApplyCallable = httpsCallable(functions, 'groups-validApply')

  return useCallback(
    () =>
      validApplyCallable({ groupId, userId })
        .then(() => enqueueSnackbar('Joueur validé', { variant: 'success' }))
        .catch(() =>
          enqueueSnackbar('Validation échouée :(', { variant: 'error' }),
        ),
    [enqueueSnackbar, groupId, userId, validApplyCallable],
  )
}
