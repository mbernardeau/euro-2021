import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import './GroupApplyStatus.scss'

const GroupApplyStatus = ({ status, group: { name, price }, reason, handleClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={!!status}
    autoHideDuration={60000}
    onClose={handleClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
      className: 'group-apply-snackbar',
    }}
    message={
      <span id="message-id">
        {status === 'failed' ? (
          reason
        ) : (
          <Fragment>
            Demande envoyée pour la tribu <b>{name}</b> !{' '}
            {price !== 0 && (
              <Fragment>
                Payer {price}€ sur la{' '}
                <a
                  title="Site cagnotte"
                  className="group-join-link"
                  href="https://www.paypal.com/pools/c/84gsKV8QG8"
                  target="_blank"
                >
                  cagnotte
                </a>{' '}
                pour valider votre inscription !
              </Fragment>
            )}
          </Fragment>
        )}
      </span>
    }
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
        <CloseIcon />
      </IconButton>,
    ]}
  />
)

GroupApplyStatus.defaultProps = {
  group: {},
}

GroupApplyStatus.propTypes = {
  status: PropTypes.string,
  group: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }),
  reason: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default GroupApplyStatus
