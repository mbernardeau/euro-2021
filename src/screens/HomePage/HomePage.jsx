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

import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ListIcon from '@mui/icons-material/List'
import PollIcon from '@mui/icons-material/Poll'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { isPast } from 'date-fns'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useSigninCheck } from 'reactfire'
import myImage from '../../assets/visuels/bandeauEvenement_PM.jpg'
import { useCompetitionData } from '../../hooks/competition'
import FinalWinner from './FinalWinner'
import './HomePage.scss'
import { useNavigate } from 'react-router'

const WinnerChoice = () => {
  const competitionData = useCompetitionData()
  const LaunchBetDate = useMemo(
    () => new Date(competitionData.launchBet.seconds * 1000),
    [competitionData.launchBet.seconds],
  )

  return isPast(LaunchBetDate) ? (
    <FinalWinner />
  ) : (
    <Typography variant="h1">
      ⚠ Le pronostic du vainqueur final sera accessible le 8 Juin à 8h ! D'ici
      là, vous pouvez créer votre groupe et vous inscrire aux notifications pour
      être prévenu de toutes les actualité du site !
    </Typography>
  )
}

const HomePage = () => {
  const navigate = useNavigate()
  const {
    data: { signedIn },
  } = useSigninCheck()

  return (
    <div className="home-page-div">
      <p className="home-speech">
        Bienvenue sur ParionsMasques, le site de pronostics de l'EURO 2021.
        Jouez en famille ou entre amis et affrontez d&apos;autres tribus ! Le
        but ? Pariez au plus proche de la réalité les résultats des équipes,
        marquez des points, et tentez de gagner la première place.
        <br />
        <br />
        Fans de foot aux grands cœurs, le site s&apos;engage à reverser une
        partie des gains (20% à 80%) à l&apos;association humanitaire{' '}
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
            onClick={() => navigate('/rules')}
            color="primary"
          >
            <ListIcon className="icon-left" />
            Règles
          </Button>
        </div>
        {signedIn && (
          <>
            <div className="home-button-panel">
              <p>Tous vos paris : </p>
              <Button
                className="home-button"
                onClick={() => navigate('/matches')}
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
                onClick={() => navigate('/ranking')}
                color="primary"
              >
                <PollIcon className="icon-left" />
                Classement
              </Button>
            </div>
          </>
        )}
      </div>
      {signedIn && <WinnerChoice />}
      <img alt="Home" className="home-logo" src={myImage} />
    </div>
  )
}

export default HomePage

HomePage.propTypes = {
  user: PropTypes.object,
}
