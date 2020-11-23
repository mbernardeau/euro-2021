/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import PollIcon from '@material-ui/icons/Poll'
import ListIcon from '@material-ui/icons/List'

import { isEmpty } from 'react-redux-firebase'

import Winner from './Winner'

import myImage from '../../assets/visuels/bandeauEvenement2.jpg'

import './HomePage.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class HomePage extends React.PureComponent {
  render() {
    const { history, user } = this.props

    return (
      <div className="home-page-div">
        <p className="home-speech">
          Bienvenue sur Road to russia 2018, le site de pronostics de la coupe du monde. Jouez en
          famille ou entre amis sur les scores du mondial et affrontez d&apos;autres tribus ! Le but
          ? Pariez au plus proche de la réalité les résultats des équipes, marquez des points, et
          tentez de gagner la première place.
          <br />
          <br />
          Fans de foot aux grands cœurs, le site s&apos;engage à reverser 50% des gains à
          l&apos;association humanitaire{' '}
          <a title="Site PAM" href="https://pourunailleursmeilleur.wordpress.com/" target="_blank" rel="noreferrer">
            PAM - Pour un Ailleurs Meilleur
          </a>.
        </p>

        <div className="home-buttons-div">
          <div className="home-button-panel">
            <p>Les règles du jeu :</p>
            <Button className="home-button" onClick={() => history.push('/rules')} color="primary">
              <ListIcon className="icon-left" />
              Règles
            </Button>
          </div>
          {!isEmpty(user) && (
            <Fragment>
              <div className="home-button-panel">
                <p>Tous vos paris : </p>
                <Button
                  className="home-button"
                  onClick={() => history.push('/matches')}
                  color="primary"
                >
                  <EventAvailableIcon className="icon-left" />
                  Parier
                </Button>
              </div>
              <div className="home-button-panel">
                <p>Votre classement : </p>
                <Button
                  className="home-button"
                  onClick={() => history.push('/ranking')}
                  color="primary"
                >
                  <PollIcon className="icon-left" />
                  Classement
                </Button>
              </div>
            </Fragment>
          )}
        </div>
        {!isEmpty(user) && <Winner />}
        <img alt="Home" className="home-logo" src={myImage} />
      </div>
    )
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.object,
}
