import { isSupported } from '@firebase/messaging'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const NotificationPermissionContext = createContext()

const compatibleNavigator = 'Notification' in window && navigator.serviceWorker

const NotificationPermissionProvider = ({ children }) => {
  const [token, setToken] = useState()

  const [permission, setPermission] = useState(() => {
    if (!compatibleNavigator) {
      return 'old-navigator'
    }
    return Notification.permission
  })

  useEffect(() => {
    const checkSupport = async () => {
      if (!(await isSupported())) {
        setPermission('old-navigator')
      }
    }
    checkSupport()
  }, [])

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
