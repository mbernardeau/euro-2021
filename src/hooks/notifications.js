import { useCallback, useContext } from 'react'
import { useAuth, useFirestore, useMessaging } from 'reactfire'
import { NotificationPermissionContext } from '../screens/Notifications/NotificationPermissionProvider'

/**
 * Hook permettant de savoir si l'utilisateur a autorisé les notifications sur ce navigateur
 *
 * @returns {{ permission?: "granted" | "denied", refreshPermission: function }}
 */
export const useNotificationPermission = () => {
  return useContext(NotificationPermissionContext)
}

export const useRegisterNavigator = () => {
  const messaging = useMessaging()
  const firestore = useFirestore()
  const { uid } = useAuth().currentUser

  const registerNavigator = useCallback(async () => {
    const token = await messaging.getToken({
      vapidKey:
        'BNFLkkL8ftMrBv1GfbDSyhoC9swL_XH-CVLTcLaEhGUdGY6iLoBQnKoRLdGgKsld7seb-kp4SJPISxKe1xDKvW8',
    })
    return firestore.collection('notificationSubscriptions').doc(token).set(
      {
        uid,
        token,
        // Ici potentiellement un niveau de notifications
      },
      { merge: true },
    )
  }, [firestore, messaging, uid])

  return [registerNavigator]
}
