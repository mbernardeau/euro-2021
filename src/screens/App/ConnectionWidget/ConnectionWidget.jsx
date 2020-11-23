import React, { Component } from 'react'
import { isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ConnectionModal from '../ConnectionModal'
import User from './User'

import './ConnectionWidget.scss'

class ConnectionWidget extends Component {
  state = {
    modalOpened: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.state.modalOpened) {
      this.setState({
        modalOpened: false,
      })
    }
  }

  openConnectionModal = () => {
    this.setState({
      modalOpened: true,
    })
  }

  closeConnectionModal = () => {
    this.setState({
      modalOpened: false,
    })
  }

  render() {
    const { user } = this.props

    return (
      <div className="connection-widget-container">
        <Dialog title="Connexion" onClose={this.closeConnectionModal} open={this.state.modalOpened}>
          <ConnectionModal />
        </Dialog>

        {!isEmpty(user) && <User />}

        {isEmpty(user) && (
          <Button className="connection-label" onClick={this.openConnectionModal}>
            Se connecter
          </Button>
        )}
      </div>
    )
  }
}

ConnectionWidget.propTypes = {
  user: PropTypes.object,
}

export default ConnectionWidget
