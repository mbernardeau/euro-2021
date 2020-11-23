import React, { useEffect, useState } from 'react'
import { isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ConnectionModal from '../ConnectionModal'
import User from './User'

import './ConnectionWidget.scss'


const ConnectionWidget = ({ user }) => {
  const [modalOpened, setModalOpened] = useState(false)

  useEffect(() => {
    if (user && modalOpened) {
      setModalOpened(false)
    }
  }, [user, modalOpened])

  return (
    <div className="connection-widget-container">
      <Dialog title="Connexion" onClose={() => setModalOpened(false)} open={modalOpened}>
        <ConnectionModal />
      </Dialog>

      {!isEmpty(user) && <User />}

      {isEmpty(user) && (
        <Button className="connection-label" onClick={() => setModalOpened(true)}>
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
