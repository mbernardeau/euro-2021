import React from 'react'
import Typography from '@material-ui/core/Typography'
import Section from '../component/section'

const Subscription = () => (
  <Section>
    <Typography variant="body2">Droits d’inscription et mode de qualification</Typography>
    <Typography variant="body1">Mode de qualification</Typography>
    <p>
      Il n’y pas d’élimination, tout le monde participe aux pronostics de tous les matchs. Chacun
      des participants garde son nombre de points acquis durant toute la compétition.
    </p>
    <Typography variant="body1">Droits d’inscription</Typography>
    <p>
      Le prix est fixé pour chaque TRIBU déclarée. Il faut s&apos;affranchir du droit d’inscription
      pour activer son compte sur le site. 50 % du prix est reversé à l’association à but
      humanitaire PAM, et les 50 % restants pour la TRIBU choisie.
    </p>
    <Typography variant="body1">Date de validation des pronostics</Typography>
    <p>
      <b>
        Les pronostics pour chaque match doivent être remplis sur le site avant le début de ceux-ci.
      </b>
      &nbsp;En ce qui concerne les pronostics sur le vainqueur de la compétition, ceux-ci doivent
      être réalisés avant le premier match de la compétition,
      <b> le jeudi 14 Juin 2018 à 18h.</b>
      <br />
      <br />
      <b>
        <u>En cas de retard ou de non-réponse</u>
      </b>
      &nbsp;sur un match ou pour le bonus,&nbsp;
      <b>
        <u>
          le joueur aura 0 point mais ne sera pas éliminé et pourra donc participer aux autres
          matchs.
        </u>
      </b>
    </p>
  </Section>
)

export default Subscription
