import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import size from 'lodash/size'

const AdminGroupRow = ({ name, joinKey, price, members, awaitingMembers }) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      {size(members)} membre{size(members) > 1 ? 's' : ''}
    </TableCell>
    <TableCell>{size(awaitingMembers) > 0 && `${size(awaitingMembers)} en attente`}</TableCell>
    <TableCell numeric>
      {price ? (
        price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
      ) : (
        <Typography variant="caption">gratuit</Typography>
      )}
    </TableCell>
    <TableCell>{joinKey}</TableCell>
  </TableRow>
)

AdminGroupRow.defaultProps = {
  members: {},
}

AdminGroupRow.propTypes = {
  name: PropTypes.string.isRequired,
  joinKey: PropTypes.string.isRequired,
  members: PropTypes.objectOf(PropTypes.bool),
  awaitingMembers: PropTypes.objectOf(PropTypes.bool),
  price: PropTypes.number,
}

export default AdminGroupRow
