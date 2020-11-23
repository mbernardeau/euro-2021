import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FaGoogle from 'react-icons/lib/fa/google'
import FaFacebook from 'react-icons/lib/fa/facebook'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import './ConnectionModal.scss'

class ConnectionModal extends Component {
  authenticateWithGoogle = () => {
    this.props.firebase.login({
      provider: 'google',
      type: 'popup',
    })
  }

  authenticateWithFacebook = () => {
    this.props.firebase.login({
      provider: 'facebook',
      type: 'popup',
    })
  }

  render() {
    return (
      <Fragment>
        <DialogTitle disableTypography>Connexion</DialogTitle>
        <DialogContent className="auth-btns-container">
          <Button color="primary" onClick={this.authenticateWithGoogle} variant="contained">
            <FaGoogle />&nbsp; Connexion avec Google
          </Button>

          <Button color="secondary" onClick={this.authenticateWithFacebook} variant="contained">
            <FaFacebook />&nbsp; Connexion avec Facebook
          </Button>
          <br />
          <Typography gutterBottom>
            En vous connectant, vous déclarez accepter la&nbsp;
            <a
              href="https://github.com/mbernardeau/Road-to-Russia-2018/blob/master/confidentialite.md"
              target="_blank" rel="noreferrer"
            >
              politique de confidentialité
            </a>{' '}
            du site.
          </Typography>
        </DialogContent>
      </Fragment>
    )
  }
}

ConnectionModal.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
}

export default ConnectionModal
