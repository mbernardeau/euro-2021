import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import includes from 'lodash/includes'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import Avatar from '../../../../components/Avatar'
import { useOpponents, useUserProfile } from '../../../../hooks'
import GroupStatus from './GroupStatus'

const GroupRow = ({
  group: { name, members, awaitingMembers, createdBy } = {},
}) => {
  const { uid } = useUserProfile()
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
