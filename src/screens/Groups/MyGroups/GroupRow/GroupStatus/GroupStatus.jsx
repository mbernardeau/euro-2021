import PropTypes from 'prop-types'

import Chip from '@mui/material/Chip'

const getLabel = ({ admin, member, awaiting }) => {
  if (admin) return 'Admin'
  if (member) return 'Membre'
  if (awaiting) return 'En attente'
  return undefined
}

const GroupStatus = ({ ...props }) => <Chip label={getLabel(props)} />

GroupStatus.propTypes = {
  member: PropTypes.bool,
  admin: PropTypes.bool,
  awaiting: PropTypes.bool,
}

export default GroupStatus
