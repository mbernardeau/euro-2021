import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getFunctions } from '@firebase/functions'
import {
  AuthProvider,
  FirestoreProvider,
  FunctionsProvider,
  useFirebaseApp,
} from 'reactfire'

export default function FirebaseProviders({ children }) {
  const firebaseApp = useFirebaseApp()

  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)
  const functions = getFunctions(firebaseApp, 'europe-west3')

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <FunctionsProvider sdk={functions}>{children}</FunctionsProvider>
      </FirestoreProvider>
    </AuthProvider>
  )
}
