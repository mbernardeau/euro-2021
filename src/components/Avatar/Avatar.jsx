import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import './Avatar.scss'

const InlineAvatar = ({ avatarUrl, displayName }) => (
  <div className="avatar-container">
    <Avatar src={avatarUrl} alt={displayName} />
    <Typography className="avatar-name" variant="h2">
      {displayName}
    </Typography>
  </div>
)

InlineAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  displayName: PropTypes.string,
}

export default InlineAvatar
