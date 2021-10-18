import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import PropTypes from 'prop-types'
import { Suspense } from 'react'
import { useHistory } from 'react-router'
import SideImg from '../../../assets/visuels/rules-281x310.png'
import { useIsUserAdmin, useIsUserConnected } from '../../../hooks'
import { openPAMTab } from '../../../utils'
import './NavigationMenu.scss'

const NavigationMenu = ({ closeMenu, menuOpen }) => {
  const isConnected = useIsUserConnected()
  const isAdmin = useIsUserAdmin()
  const history = useHistory()

  const goTo = (to) => () => {
    if (history.location.pathname !== to) {
      history.push(to)
    }
    closeMenu()
  }

  return (
    <Drawer open={menuOpen} onClose={closeMenu}>
      <List>
        {/* Route accessibles sans connexion */}
        <ListItem button onClick={goTo('/')}>
          <img src={SideImg} className="navigation-menu-image" alt="Accueil" />
        </ListItem>
        <Divider />

        {/* Route accessibles sans connexion (Doublon page d'accueil) */}
        <ListItem button onClick={goTo('/')}>
          <ListItemText primary="Accueil" />
        </ListItem>

        {/* Route accessibles avec connexion */}
        {isConnected && (
          <ListItem button onClick={goTo('/matches')}>
            <ListItemText primary="Pariez" />
          </ListItem>
        )}

        {/* Route accessibles avec connexion */}
        {isConnected && (
          <ListItem button onClick={goTo('/ranking')}>
            <ListItemText primary="Classement" />
          </ListItem>
        )}

        {/* Route accessible pour admin seulement */}
        {isAdmin && (
          <ListItem button onClick={goTo('/matchesvalidation')}>
            <ListItemText primary="Validation des matchs" />
          </ListItem>
        )}

        {/* Route accessibles avec connexion */}
        {isConnected && (
          <ListItem button onClick={goTo('/groups')}>
            <ListItemText primary="Gestion des tribus" />
          </ListItem>
        )}

        {/* Route accessible pour admin seulement */}
        {isAdmin && (
          <ListItem button onClick={goTo('/validinscription')}>
            <ListItemText primary="Valider l'inscription d'un membre" />
          </ListItem>
        )}

        {/* Routes accessibles sans connexion */}
        <ListItem button onClick={goTo('/rules')}>
          <ListItemText primary="Réglement" />
        </ListItem>

        {/* Routes accessibles sans connexion */}
        <ListItem button onClick={goTo('/faq')}>
          <ListItemText primary="FAQ" />
        </ListItem>

        {/* Routes accessibles sans connexion */}
        <ListItem button onClick={openPAMTab}>
          <ListItemText primary="L'association PAM" />
        </ListItem>
      </List>
    </Drawer>
  )
}

NavigationMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
}

const NavigationMenuSuspense = (props) => {
  return (
    <Suspense fallback="Loading Navigation menu">
      <NavigationMenu {...props} />
    </Suspense>
  )
}

export default NavigationMenuSuspense
