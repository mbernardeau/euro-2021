import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import './Avatar.scss'

const InlineAvatar = ({ avatarUrl, displayName }) => (
  <div className="avatar-container">
    <Avatar src={avatarUrl} />
    <Typography className="avatar-name" variant="subheading">
      {displayName}
    </Typography>
  </div>
)

InlineAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  displayName: PropTypes.string,
}

export default InlineAvatar
