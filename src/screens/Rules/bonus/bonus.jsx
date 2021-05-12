import React from 'react'
import Typography from '@material-ui/core/Typography'
import Section from '../component/section'

const Bonus = () => (
  <Section>
    <Typography variant="h1" color="inherit">
      Vainqueur final
    </Typography>
    <p>
      Chaque joueur pronostique également le champion de l'EURO 2021 avant que
      la compétition commence. Si jamais celui-ci est trouvé par le parieur une
      fois la compétition terminée, la cote associée au pays pronostiqué est
      ajouté aux autres points gagnés durant toute la compétition.
    </p>
  </Section>
)

export default Bonus
