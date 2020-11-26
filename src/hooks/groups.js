import { useSnackbar } from 'notistack'
import { useFirestore } from 'react-redux-firebase'
import { useUser } from 'reactfire'
import { v4 as uuidv4 } from 'uuid'

const priceValidationMessage = (price) => (
  <>
    Payer {price}€ sur la{' '}
    <a
      title="Site cagnotte"
      className="group-join-link"
      href="https://www.paypal.com/pools/c/84gsKV8QG8"
      target="_blank"
      rel="noreferrer"
    >
      cagnotte
    </a>{' '}
    pour valider votre inscription !
  </>
)

export const useCreateGroup = () => {
  const user = useUser()
  const firestore = useFirestore()
  const { enqueueSnackbar } = useSnackbar()

  return async (group) => {
    const joinKey = uuidv4().slice(0, 5).toUpperCase()
    await firestore.collection('groups').add({
      ...group,
      createdBy: user.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
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

    debugger
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
          awaitingMembers: firestore.FieldValue.arrayUnion('greater_virginia'),
        })

      enqueueSnackbar(
        <>
          Demande envoyée pour la tribu <b>{group.name}</b> !{' '}
          {priceValidationMessage(group.price)}
        </>,
        { variant: 'success' },
      )
    } else {
      await firestore
        .collection('groups')
        .doc(groupSnapshot.id)
        .update({
          members: firestore.FieldValue.arrayUnion('greater_virginia'),
        })
      enqueueSnackbar(
        <>
          Demande envoyée pour la tribu <b>{group.name}</b> !
        </>,
        { variant: 'success' },
      )
    }
  }

  return [applyFn]
}
