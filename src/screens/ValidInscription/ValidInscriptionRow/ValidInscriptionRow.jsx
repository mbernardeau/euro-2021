import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

const ValidInscriptionRow = ({
  user: { displayName, email },
  name,
  price,
  validApply,
}) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>{displayName}</TableCell>
    <TableCell>{email}</TableCell>
    <TableCell numeric>
      {price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
    </TableCell>
    <TableCell>
      <Button variant="contained" color="primary" onClick={validApply}>
        Valider
      </Button>
    </TableCell>
  </TableRow>
)

ValidInscriptionRow.defaultProps = {
  price: 0,
}

ValidInscriptionRow.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  validApply: PropTypes.func.isRequired,
}

export default ValidInscriptionRow
