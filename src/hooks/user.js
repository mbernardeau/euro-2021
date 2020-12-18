import { useHistory } from 'react-router'
import { useAuth, useIdTokenResult } from 'reactfire'
import { useUser, useFirestore, useFirestoreDocData } from 'reactfire'

export const useGoogleLogin = () => {
  const auth = useAuth()

  auth.languageCode = 'fr'

  const provider = new useAuth.GoogleAuthProvider()

  return () => auth.signInWithRedirect(provider)
}

export const useFacebookLogin = () => {
  const auth = useAuth()

  auth.languageCode = 'fr'

  const provider = new useAuth.FacebookAuthProvider()

  return () => auth.signInWithRedirect(provider)
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

export const useIsUserAdmin = () => {
  const isConnected = useIsUserConnected()

  const user = useUser().data

  const token = useIdTokenResult(
    isConnected && user ? user : { getIdTokenResult: () => Promise.resolve() },
  )

  return isConnected && token?.data?.claims?.role === 'admin'
}
