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

import Button from '@material-ui/core/Button'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import ListIcon from '@material-ui/icons/List'
import PollIcon from '@material-ui/icons/Poll'
import PropTypes from 'prop-types'
import React from 'react'
import { AuthCheck } from 'reactfire'
import myImage from '../../assets/visuels/bandeauEvenement2.webp'
import './HomePage.scss'
import FinalWinner from './FinalWinner'

const HomePage = ({ history }) => {
  return (
    <div className="home-page-div">
      <p className="home-speech">
        Bienvenue sur Parions Masques 2021, le site de pronostics du championat
        d'europe des nations. Jouez en famille ou entre amis sur les scores des
        matchs et affrontez d&apos;autres tribus ! Le but ? Pariez au plus
        proche de la réalité les résultats des équipes, marquez des points, et
        tentez de gagner la première place.
        <br />
        <br />
        Fans de foot aux grands cœurs, le site s&apos;engage à reverser une
        partie du prix de l'inscription à l&apos;association humanitaire
        <br />{' '}
        <a
          title="Site PAM"
          href="https://pourunailleursmeilleur.wordpress.com/"
          target="_blank"
          rel="noreferrer"
        >
          PAM - Pour un Ailleurs Meilleur
        </a>
        .
      </p>

      <div className="home-buttons-div">
        <div className="home-button-panel">
          <p>Les règles du jeu :</p>
          <Button
            className="home-button"
            onClick={() => history.push('/rules')}
            color="primary"
          >
            <ListIcon className="icon-left" />
            Règles
          </Button>
        </div>
        <AuthCheck>
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
        </AuthCheck>
      </div>
      <AuthCheck>
        <FinalWinner />
      </AuthCheck>
      <img alt="Home" className="home-logo" src={myImage} />
    </div>
  )
}

export default HomePage

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.object,
}
