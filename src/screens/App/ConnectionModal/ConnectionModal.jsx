import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaGoogle from 'react-icons/lib/fa/google'
import { useGoogleLogin, useFacebookLogin } from '../../../hooks'
import './ConnectionModal.scss'

const ConnectionModal = () => {
  const authenticateWithGoogle = useGoogleLogin()
  const authenticateWithFacebook = useFacebookLogin()

  return (
    <>
      <DialogTitle disableTypography>Connexion</DialogTitle>
      <DialogContent className="auth-btns-container">
        <Button
          color="primary"
          onClick={authenticateWithGoogle}
          variant="contained"
        >
          <FaGoogle />
          &nbsp; Connexion avec Google
        </Button>

        <Button
          color="secondary"
          onClick={authenticateWithFacebook}
          variant="contained"
        >
          <FaFacebook />
          &nbsp; Connexion avec Facebook
        </Button>
        <br />
        <Typography gutterBottom>
          En vous connectant, vous déclarez accepter la&nbsp;
          <a
            href="https://github.com/mbernardeau/Road-to-Russia-2018/blob/master/confidentialite.md"
            target="_blank"
            rel="noreferrer"
          >
            politique de confidentialité
          </a>{' '}
          du site.
        </Typography>
      </DialogContent>
    </>
  )
}

ConnectionModal.propTypes = {}

export default ConnectionModal
