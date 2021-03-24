import { createContext, useCallback, useMemo, useState } from 'react'
import { useMessaging } from 'reactfire'

export const NotificationPermissionContext = createContext()

const compatibleNavigator = 'Notification' in window && navigator.serviceWorker

const NotificationPermissionProvider = ({ children }) => {
  const isSupported = useMessaging.isSupported()
  const [token, setToken] = useState()

  const [permission, setPermission] = useState(() => {
    if (!compatibleNavigator || !isSupported) {
      return 'old-navigator'
    }
    return Notification.permission
  })

  const refreshPermission = useCallback(async () => {
    if (!compatibleNavigator) {
      return
    }
    const p = await Notification.requestPermission()

    setPermission(p)
  }, [setPermission])

  const value = useMemo(
    () => ({
      permission,
      refreshPermission,
      token,
      setToken,
    }),
    [permission, refreshPermission, token, setToken],
  )

  return (
    <NotificationPermissionContext.Provider value={value}>
      {children}
    </NotificationPermissionContext.Provider>
  )
}

export default NotificationPermissionProvider
