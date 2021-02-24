import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useNotificationPermission } from '../../hooks'

const Profile = () => {
  const { permission, refreshPermission } = useNotificationPermission()

  return (
    <Card title="Notifications">
      <CardContent>
        <Typography variant="h2">Notifications</Typography>
        <PermissionStatus
          permission={permission}
          refreshPermission={refreshPermission}
        />
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
