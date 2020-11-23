import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import './GroupCreateStatus.scss'

const GroupCreateStatus = ({
  status,
  group: { name, joinKey, price },
  reason,
  handleClose,
}) => (
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
    }}
    message={
      <span id="message-id">
        {status === 'failed' ? (
          reason
        ) : (
          <Fragment>
            {price !== 0 && (
              <Fragment>
                Payer {price}€ sur la{' '}
                <a
                  title="Site cagnotte"
                  className="group-create-link"
                  href="https://www.paypal.com/pools/c/84gsKV8QG8"
                  target="_blank"
                  rel="noreferrer"
                >
                  cagnotte
                </a>{' '}
                pour valider votre inscription !
              </Fragment>
            )}
            Tribu {name} créée avec la clé <b>{joinKey}</b>.
          </Fragment>
        )}
      </span>
    }
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
)

GroupCreateStatus.defaultProps = {
  group: {},
}

GroupCreateStatus.propTypes = {
  status: PropTypes.string,
  group: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    joinKey: PropTypes.string,
  }),
  reason: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default GroupCreateStatus
