import { useHistory } from 'react-router'
import { useAuth } from 'reactfire'
import { useUser, useFirestore, useFirestoreDocData } from 'reactfire'

const saveUserData = (firestore, FieldValue) => ({
  additionalUserInfo,
  user,
}) => {
  firestore
    .collection('users')
    .doc(user.uid)
    .set(
      {
        uid: user.uid,
        avatarUrl: user.photoURL,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        providerId: additionalUserInfo.providerId,
        profile: additionalUserInfo.profile,
        lastConnection: FieldValue.serverTimestamp(),
        nbConnections: FieldValue.increment(1),
      },
      { merge: true },
    )
}

export const useGoogleLogin = () => {
  const auth = useAuth()
  const firestore = useFirestore()
  const FieldValue = useFirestore.FieldValue

  auth.languageCode = 'fr'

  const provider = new useAuth.GoogleAuthProvider()

  return () =>
    auth.signInWithPopup(provider).then(saveUserData(firestore, FieldValue))
}

export const useFacebookLogin = () => {
  const auth = useAuth()
  const firestore = useFirestore()
  const FieldValue = useFirestore.FieldValue

  auth.languageCode = 'fr'

  const provider = new useAuth.FacebookAuthProvider()

  return () =>
    auth.signInWithPopup(provider).then(saveUserData(firestore, FieldValue))
}

export const useLogout = () => {
  const auth = useAuth()
  const history = useHistory()

  return async () => {
    await auth.signOut()
    history.push('/')
  }
}

export const useUserProfile = () => {
  const firestore = useFirestore()
  const { uid } = useUser().data ?? {}

  const userRef = firestore
    .collection('users')
    .doc(useIsUserConnected() ? uid : ' ')

  return useFirestoreDocData(userRef).data
}

export const useIsUserConnected = () => {
  // Fix du crash lors d'une connexion. Il arrive que lors du premier rendu 'reactfire'
  // fournisse des données incohérentes entre useUser et useAuth.
  // Pour éviter que les requêtes qui nécessitent une authentification échoue, on valide que les données sont cohérentes
  const { uid: uidUser } = useUser().data ?? {}
  const { uid: uidAuth } = useAuth().currentUser ?? {}
  return uidUser && uidAuth && uidAuth === uidUser
}

export const useIsUserAdmin = () => !!useUserProfile()?.admin
