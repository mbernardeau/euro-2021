import PropTypes from 'prop-types'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import size from 'lodash/size'

const AdminGroupRow = ({
  group: { name, joinKey, price, members, awaitingMembers },
}) => (
  <TableRow>
    <TableCell>
      <b>{name}</b>
    </TableCell>
    <TableCell>
      {size(members)} membre{size(members) > 1 ? 's' : ''}
    </TableCell>
    <TableCell>
      {size(awaitingMembers) > 0 && `${size(awaitingMembers)} en attente`}
    </TableCell>
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

AdminGroupRow.defaultProps = {}

AdminGroupRow.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    joinKey: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string),
    awaitingMembers: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
  }),
}

export default AdminGroupRow
