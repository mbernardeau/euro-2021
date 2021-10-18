import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire'

export default function FirebaseProviders({ children }) {
  const firebaseApp = useFirebaseApp()

  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
    </AuthProvider>
  )
}
