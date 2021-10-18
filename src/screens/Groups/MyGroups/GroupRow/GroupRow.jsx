import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import includes from 'lodash/includes'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useAuth } from 'reactfire'
import Avatar from '../../../../components/Avatar'
import { useOpponents } from '../../../../hooks/opponents'
import GroupStatus from './GroupStatus'

const GroupRow = ({
  group: { name, members, awaitingMembers, createdBy } = {},
}) => {
  const { uid } = useAuth().currentUser
  const createdByArray = useMemo(() => [createdBy], [createdBy])
  const [creator] = useOpponents(createdByArray)

  return (
    <TableRow>
      <TableCell>
        <b>{name}</b>
      </TableCell>
      <TableCell>
        <Avatar avatarUrl={creator?.data().avatarUrl} />
      </TableCell>
      <TableCell>
        <GroupStatus
          member={includes(members, uid)}
          awaiting={includes(awaitingMembers, uid)}
          admin={createdBy === uid}
        />
      </TableCell>
    </TableRow>
  )
}

GroupRow.defaultProps = {
  members: {},
  awaitingMembers: {},
}

GroupRow.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string),
    awaitingMembers: PropTypes.arrayOf(PropTypes.string),
    createdBy: PropTypes.string.isRequired,
  }),
}

export default GroupRow
