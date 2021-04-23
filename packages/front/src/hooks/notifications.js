import { useCallback, useContext } from 'react'
import {
  useAuth,
  useFirestore,
  useFirestoreDocData,
  useMessaging,
} from 'reactfire'
import { useSnackbar } from 'notistack'

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
  const FieldValue = useFirestore.FieldValue
  const ref = firestore.collection('notificationSubscriptions').doc(token)

  const updateConfiguration = async (newConfig) => {
    await ref.set(
      {
        ...newConfig,
        updatedAt: FieldValue.serverTimestamp(),
        version: FieldValue.increment(1),
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
  const messaging = useMessaging()
  const firestore = useFirestore()
  const FieldValue = useFirestore.FieldValue
  const { setToken } = useNotificationPermission()

  const { uid } = useAuth().currentUser

  const registerNavigator = useCallback(async () => {
    const token = await messaging.getToken({
      vapidKey: firebaseConfig.vapidKey,
    })
    setToken(token)

    return firestore
      .collection('notificationSubscriptions')
      .doc(token)
      .set(
        {
          uid,
          token,
          PREMATCH: true,
          updatedAt: FieldValue.serverTimestamp(),
          version: FieldValue.increment(1),
        },
        { merge: true },
      )
  }, [FieldValue, firestore, messaging, setToken, uid])

  return [registerNavigator]
}
