import React from 'react'
import Typography from '@material-ui/core/Typography'
import Section from '../component/section'

const Bonus = () => (
  <Section>
    <Typography variant="body2" color="inherit">
      Bonus
    </Typography>
    <p>
      Chaque joueur pronostique également le champion de la coupe du monde avant le début de cette
      dernière. Une cote est associée à chacun des pays et en cas de succès, les points gagnés sont
      ajoutés aux points cumulés durant toute la compétition.
    </p>
    <p>
      Ainsi les points sont attribués comme suit : cote du pays vainqueur de la coupe du monde * 3
      points
    </p>
  </Section>
)

export default Bonus
