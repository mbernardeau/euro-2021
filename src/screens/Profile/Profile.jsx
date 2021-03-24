import { FormControlLabel, Switch, Tooltip } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { InfoOutlined } from '@material-ui/icons'
import React from 'react'
import {
  useNotificationConfiguration,
  useNotificationPermission,
} from '../../hooks'
import './Profile.scss'

const Profile = () => {
  const { permission, refreshPermission } = useNotificationPermission()
  const [config, updateConfig] = useNotificationConfiguration()

  return (
    <Card>
      <CardContent>
        <Typography variant="h2">Notifications</Typography>
        <PermissionStatus
          permission={permission}
          refreshPermission={refreshPermission}
        />
        {permission === 'granted' && (
          <div className="notification-type-chooser">
            <Typography variant="h3">
              Choisissez les types de notifications:
            </Typography>

            <div className="info-wrapper">
              <FormControlLabel
                control={<Switch />}
                checked={config.PREMATCH}
                onChange={(e) => updateConfig({ PREMATCH: e.target.checked })}
                label="Activer les rappels avant match"
              />
              <Tooltip title="Vous recevrez une notification dans les 2 heures précédent le match, seulement si vous n'avez pas rempli votre pari.">
                <InfoOutlined style={{ fontSize: 14, marginLeft: -12 }} />
              </Tooltip>
            </div>
          </div>
        )}
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
