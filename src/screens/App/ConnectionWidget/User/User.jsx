import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import './user.scss'

class User extends PureComponent {
  state = {
    anchorEl: null,
    open: false,
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { user, logout } = this.props

    return (
      <div className="user-widget">
        <Avatar src={user.avatarUrl} className="user-avatar" />

        <span className="username">{user.displayName}</span>

        <IconButton
          aria-label="Plus"
          aria-owns={this.state.open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
        >
          <MenuItem onClick={logout}>Se déconnecter</MenuItem>
        </Menu>
      </div>
    )
  }
}

User.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
}

export default User
