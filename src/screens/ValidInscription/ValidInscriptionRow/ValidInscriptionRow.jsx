import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import { useValidApply } from '../../../hooks'

const ValidInscriptionRow = ({
  user: { displayName, email, uid },
  group: { name, price },
  groupId,
}) => {
  const validApply = useValidApply(groupId, uid)
  return (
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
}

ValidInscriptionRow.defaultProps = {
  price: 0,
}

ValidInscriptionRow.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }),
  groupId: PropTypes.string.isRequired,
}

export default ValidInscriptionRow
