import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { isEmpty } from 'react-redux-firebase'

import WorldCupImg from '../../../assets/2018_FIFA_WC.svg'
import { openPAMTab } from '../../../utils'

import './NavigationMenu.scss'

const isConnected = (user) => !isEmpty(user)
const isAdmin = (user) => isConnected(user) && user.admin

class NavigationMenu extends Component {
  goTo = (to) => () => {
    const { history, closeMenu } = this.props
    if (history.location.pathname !== to) {
      history.push(to)
    }
    closeMenu()
  }

  render() {
    const { user } = this.props

    return (
      <Drawer open={this.props.open} onClose={() => this.props.closeMenu()}>
        <List>
          {/* Route accessibles sans connexion */}
          <ListItem button onClick={this.goTo('/')}>
            <img
              src={WorldCupImg}
              className="navigation-menu-image"
              alt="Accueil"
            />
          </ListItem>
          <Divider />

          {/* Route accessibles sans connexion (Doublon page d'accueil) */}
          <ListItem button onClick={this.goTo('/')}>
            <ListItemText primary="Accueil" />
          </ListItem>

          {/* Route accessibles avec connexion */}
          {isConnected(user) && (
            <ListItem button onClick={this.goTo('/matches')}>
              <ListItemText primary="Pariez" />
            </ListItem>
          )}

          {/* Route accessibles avec connexion */}
          {isConnected(user) && (
            <ListItem button onClick={this.goTo('/ranking')}>
              <ListItemText primary="Classement" />
            </ListItem>
          )}

          {/* Route accessible pour admin seulement */}
          {isAdmin(user) && (
            <ListItem button onClick={this.goTo('/matchesvalidation')}>
              <ListItemText primary="Validation des matchs" />
            </ListItem>
          )}

          {/* Route accessibles avec connexion */}
          {isConnected(user) && (
            <ListItem button onClick={this.goTo('/groups')}>
              <ListItemText primary="Gestion des tribus" />
            </ListItem>
          )}

          {/* Route accessible pour admin seulement */}
          {isAdmin(user) && (
            <ListItem button onClick={this.goTo('/validinscription')}>
              <ListItemText primary="Valider l'inscription d'un membre" />
            </ListItem>
          )}

          {/* Routes accessibles sans connexion */}
          <ListItem button onClick={this.goTo('/rules')}>
            <ListItemText primary="Réglement" />
          </ListItem>

          {/* Routes accessibles sans connexion */}
          <ListItem button onClick={this.goTo('/faq')}>
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
}

NavigationMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    admin: PropTypes.bool,
  }),
}

export default NavigationMenu
