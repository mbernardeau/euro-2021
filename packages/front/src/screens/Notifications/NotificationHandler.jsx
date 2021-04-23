import { useEffect } from 'react'
import { useRegisterNavigator } from '../../hooks'

const NotificationHandler = () => {
  const [registerNavigator] = useRegisterNavigator()

  useEffect(() => {
    registerNavigator()
  }, [registerNavigator])

  return null
}

export default NotificationHandler
