import {
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore'
import { getMessaging, getToken } from '@firebase/messaging'
import { useSnackbar } from 'notistack'
import { useCallback, useContext } from 'react'
import { useAuth, useFirestore, useFirestoreDocData } from 'reactfire'
import firebaseConfig from '../firebaseConfig'
import { NotificationPermissionContext } from '../screens/Notifications/NotificationPermissionProvider'

/**
 * Hook permettant de savoir si l'utilisateur a autorisé les notifications sur ce navigateur
 *
 * @returns {{ permission?: "granted" | "denied", refreshPermission: function }}
 */
export const useNotificationPermission = () => {
  return useContext(NotificationPermissionContext)
}

export const useNotificationConfiguration = () => {
  const { token } = useNotificationPermission()
  const { enqueueSnackbar } = useSnackbar()

  const firestore = useFirestore()
  const ref = doc(firestore, 'notificationSubscriptions', token)

  const updateConfiguration = async (newConfig) => {
    await setDoc(
      ref,
      {
        ...newConfig,
        updatedAt: serverTimestamp(),
        version: increment(1),
      },
      { merge: true },
    )

    enqueueSnackbar('Les paramètres de notifications ont été enregistrés', {
      variant: 'success',
    })
  }

  return [
    useFirestoreDocData(ref, { idField: 'token' }).data,
    updateConfiguration,
  ]
}

export const useRegisterNavigator = () => {
  const firestore = useFirestore()
  const { setToken } = useNotificationPermission()

  const { uid } = useAuth().currentUser

  const registerNavigator = useCallback(async () => {
    const token = await getToken(getMessaging(), {
      vapidKey: firebaseConfig.vapidKey,
    })
    setToken(token)

    const collectionRef = collection(firestore, 'notificationSubscriptions')
    const docRef = doc(collectionRef, token)
    return setDoc(
      docRef,
      {
        uid,
        token,
        PREMATCH: true,
        updatedAt: serverTimestamp(),
        version: increment(1),
      },
      { merge: true },
    )
  }, [firestore, setToken, uid])

  return [registerNavigator]
}
