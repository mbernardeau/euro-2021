import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import Typography from '@mui/material/Typography'
import { InfoOutlined } from '@mui/icons-material'
import React from 'react'
import { useNotificationConfiguration } from '../../../hooks'

const NotificationConfiguration = () => {
  const [config, updateConfig] = useNotificationConfiguration()

  return (
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
  )
}

export default NotificationConfiguration
