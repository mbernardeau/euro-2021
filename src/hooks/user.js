import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from '@firebase/auth'
import { collection, doc } from '@firebase/firestore'
import { useNavigate } from 'react-router'
import {
  useAuth,
  useFirestore,
  useFirestoreDocData,
  useIdTokenResult,
  useUser,
} from 'reactfire'

export const useGoogleLogin = () => {
  const auth = useAuth()

  auth.languageCode = 'fr'

  const provider = new GoogleAuthProvider()

  return () => signInWithRedirect(auth, provider)
}

export const useFacebookLogin = () => {
  const auth = useAuth()

  auth.languageCode = 'fr'

  const provider = new FacebookAuthProvider()

  return () => signInWithRedirect(auth, provider)
}

export const useLogout = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  return async () => {
    await auth.signOut()
    navigate('/')
  }
}

export const useUserProfile = () => {
  const firestore = useFirestore()
  const { uid } = useUser().data ?? {}
  const userCollection = collection(firestore, 'users')
  const userRef = doc(userCollection, useIsUserConnected() ? uid : ' ')

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
