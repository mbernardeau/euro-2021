import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from 'reactfire'
import { useLogout } from '../../../../hooks'
import './user.scss'

const User = () => {
  const user = useAuth().currentUser
  const logout = useLogout()
  const [isOpen, setIsOpen] = useState(false)
  const anchorEl = useRef()
  const history = useHistory()

  return (
    <div className="user-widget">
      <Avatar src={user.avatarUrl} className="user-avatar" />

      <span className="username">{user.displayName}</span>

      <IconButton
        aria-label="Plus"
        aria-owns={isOpen ? 'long-menu' : null}
        aria-haspopup="true"
        onClick={() => setIsOpen(true)}
        ref={anchorEl}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={anchorEl?.current}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem
          onClick={() => {
            history.push('/profile')
            setIsOpen(false)
          }}
        >
          Profil
        </MenuItem>
        <MenuItem onClick={logout}>Se déconnecter</MenuItem>
      </Menu>
    </div>
  )
}

User.propTypes = {}

export default User
