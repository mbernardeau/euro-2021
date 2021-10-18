import { useEffect } from 'react'
import { useRegisterNavigator } from '../../hooks/notifications'

const NotificationHandler = () => {
  const [registerNavigator] = useRegisterNavigator()

  useEffect(() => {
    registerNavigator()
  }, [registerNavigator])

  return null
}

export default NotificationHandler
