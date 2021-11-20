import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from 'reactfire'
import { useLogout } from '../../../../hooks/user'
import './user.scss'

const User = () => {
  const user = useAuth().currentUser
  const logout = useLogout()
  const [isOpen, setIsOpen] = useState(false)
  const anchorEl = useRef()
  const navigate = useNavigate()

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
        size="large"
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
            navigate('/profile')
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
