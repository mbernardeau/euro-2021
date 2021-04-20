import React from 'react'
import Typography from '@material-ui/core/Typography'
import Section from '../component/section'

const Subscription = () => (
  <Section>
    <Typography variant="body2">
      Droits d’inscription et mode de qualification
    </Typography>
    <Typography variant="body1">Mode de qualification</Typography>
    <p>
      Il n’y pas d’élimination, tout le monde participe aux pronostics de tous
      les matchs. Chacun des participants garde son nombre de points acquis
      durant toute la compétition.
    </p>
    <Typography variant="body1">Droits d’inscription</Typography>
    <p>
      Il faut s'affranchir du droit d’inscription pour activer son compte sur le
      site. Chaque tribu va décider du pourcentage à reverser à l’association à
      but humanitaire PAM, et qui ne peut-être qu’entre 20% et 80% du prix.
    </p>
    <Typography variant="body1">Date de validation des pronostics</Typography>
    <p>
      <b>
        Les pronostics pour chaque match doivent être remplis sur le site avant
        le début de ceux-ci.
      </b>
      &nbsp;En ce qui concerne les pronostics sur le vainqueur de la
      compétition, ceux-ci doivent être réalisés avant le premier match de la
      compétition,
      <b> le jeudi 11 Juin 2021 à 18h.</b>
      <br />
      <br />
      <b>
        <u>En cas de retard ou de non-réponse</u>
      </b>
      &nbsp;sur un match ou pour le bonus,&nbsp;
      <b>
        <u>
          le joueur aura 0 point mais ne sera pas éliminé et pourra donc
          participer aux autres matchs.
        </u>
      </b>
    </p>
  </Section>
)

export default Subscription
