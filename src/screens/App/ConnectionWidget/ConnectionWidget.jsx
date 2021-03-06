import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useIsUserConnected } from '../../../hooks'
import ConnectionModal from '../ConnectionModal'
import './ConnectionWidget.scss'
import User from './User'

const ConnectionWidget = () => {
  const isConnected = useIsUserConnected()
  const [modalOpened, setModalOpened] = useState(false)

  useEffect(() => {
    if (isConnected && modalOpened) {
      setModalOpened(false)
    }
  }, [isConnected, modalOpened])

  return (
    <div className="connection-widget-container">
      <Dialog
        title="Connexion"
        onClose={() => setModalOpened(false)}
        open={modalOpened}
      >
        <ConnectionModal />
      </Dialog>

      {isConnected && <User />}

      {!isConnected && (
        <Button
          className="connection-label"
          onClick={() => setModalOpened(true)}
        >
          Se connecter
        </Button>
      )}
    </div>
  )
}

ConnectionWidget.propTypes = {
  user: PropTypes.object,
}

export default ConnectionWidget
