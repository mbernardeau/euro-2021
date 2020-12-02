import { useSnackbar } from 'notistack'
import { useCallback } from 'react'
import { useFirestoreCollection, useUser, useFirestore } from 'reactfire'
import { v4 as uuidv4 } from 'uuid'
import { useIsUserAdmin, useUserProfile } from './user'

const priceValidationMessage = (price) => (
  <>
    Payer {price}€ sur la&nbsp;
    <a
      title="Site cagnotte"
      className="group-join-link"
      href="https://www.paypal.com/pools/c/84gsKV8QG8"
      target="_blank"
      rel="noreferrer"
    >
      cagnotte
    </a>
    &nbsp; pour valider votre inscription !
  </>
)

export const useCreateGroup = () => {
  const user = useUser()
  const firestore = useFirestore()
  const FieldValue = useFirestore.FieldValue
  const { enqueueSnackbar } = useSnackbar()

  return async (group) => {
    const joinKey = uuidv4().slice(0, 5).toUpperCase()
    await firestore.collection('groups').add({
      ...group,
      createdBy: user.uid,
      createdAt: FieldValue.serverTimestamp(),
      joinKey,
      version: 1,
      members: [user.uid],
    })

    enqueueSnackbar(
      <>
        Groupe {group.name} créé avec le code <b>{joinKey}</b>.&nbsp;
        {group.price > 0 && priceValidationMessage(group.price)}
      </>,
      { variant: 'success' },
    )
  }
}

export const useApplyInGroup = () => {
  const firestore = useFirestore()
  const user = useUser()
  const { enqueueSnackbar } = useSnackbar()
  const FieldValue = useFirestore.FieldValue

  const applyFn = async (joinKey) => {
    const groupQuerySnapshot = await firestore
      .collection('groups')
      .where('joinKey', '==', joinKey)
      .get()

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

    if (group.price > 0) {
      await firestore
        .collection('groups')
        .doc(groupSnapshot.id)
        .update({
          awaitingMembers: FieldValue.arrayUnion(user.uid),
        })

      enqueueSnackbar(
        <>
          Demande envoyée pour la tribu&nbsp;<b>{group.name}</b> !{' '}
          {priceValidationMessage(group.price)}
        </>,
        { variant: 'success' },
      )
    } else {
      await firestore
        .collection('groups')
        .doc(groupSnapshot.id)
        .update({
          members: FieldValue.arrayUnion(user.uid),
        })
      enqueueSnackbar(
        <>
          Demande envoyée pour la tribu&nbsp;<b>{group.name}</b> !
        </>,
        { variant: 'success' },
      )
    }
  }

  return [applyFn]
}

export const useGroupsForUserMember = () => {
  const { uid } = useUserProfile()

  const query = useFirestore()
    .collection('groups')
    .where('members', 'array-contains', uid)

  return useFirestoreCollection(query).docs
}

export const useGroupsForUserAwaitingMember = () => {
  const { uid } = useUserProfile()

  const query = useFirestore()
    .collection('groups')
    .where('awaitingMembers', 'array-contains', uid)

  return useFirestoreCollection(query).docs
}

export const useGroupsForUser = () => {
  const groupsMember = useGroupsForUserMember()
  const groupsAwaitingMember = useGroupsForUserAwaitingMember()

  return [...groupsMember, ...groupsAwaitingMember]
}

export const useGroupCreatedByUser = () => {
  const { uid } = useUserProfile()

  const query = useFirestore()
    .collection('groups')
    .where('createdBy', '==', uid)

  return useFirestoreCollection(query).docs
}

export const useGroupsContainingAwaitingMembers = () => {
  const query = useFirestore()
    .collection('groups')
    .where('awaitingMembers', '!=', [])

  return useFirestoreCollection(query).docs
}

export const useValidApply = (groupId, userId) => {
  const isAdmin = useIsUserAdmin()
  if (!isAdmin) {
    throw new Error('useValidApply can only be used by admins')
  }
  const { enqueueSnackbar } = useSnackbar()
  const firestore = useFirestore()
  const FieldValue = useFirestore.FieldValue

  return useCallback(
    () =>
      firestore
        .collection('groups')
        .doc(groupId)
        .update({
          awaitingMembers: FieldValue.arrayRemove(userId),
          members: FieldValue.arrayUnion(userId),
        })
        .then(() => enqueueSnackbar('Joueur validé', { variant: 'success' }))
        .catch(() =>
          enqueueSnackbar('Validation échouée :(', { variant: 'error' }),
        ),
    [FieldValue, enqueueSnackbar, firestore, groupId, userId],
  )
}
