import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNotificationPermission } from '../../hooks'
import NotificationConfiguration from './NotificationConfiguration'
import './Profile.scss'

const Profile = () => {
  const { permission, token, refreshPermission } = useNotificationPermission()

  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Notifications</Typography>
        <PermissionStatus
          permission={permission}
          refreshPermission={refreshPermission}
        />
        {permission === 'granted' && token && <NotificationConfiguration />}
      </CardContent>
    </Card>
  )
}

const PermissionStatus = ({ permission, refreshPermission }) => {
  switch (permission) {
    case 'granted':
      return 'Les notifications sont déjà activées pour ce navigateur'
    case 'old-navigator':
      return 'Votre navigateur ne prend pas en charge les notifications'
    default:
      return (
        <Button onClick={refreshPermission}>Activer les notifications</Button>
      )
  }
}

export default Profile
