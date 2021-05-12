import React from 'react'
import Typography from '@material-ui/core/Typography'

import Section from '../component/section'
import Table from '../component/table'

const Groups = () => (
  <Section>
    <div>
      <Typography variant="h1">Règles durant la phase de groupe</Typography>
      <p>
        Les pronostics fonctionnent avec un système de cotes basé sur notre
        propre système de calcul de côtes ! En effet, pour chaque match nous
        proposons une cote pour chaque résultat possible. Ces cotes
        multiplieront les points attribués selon les trois différents cas
        ci-dessous. Nous nous réservons le droit de changer les cotes jusqu’à la
        veille de chaque match. Les points sont attribués pour les matchs de
        poules comme suit :
        <ol>
          <li>
            Tout d’abord c’est le type de résultat qui compte en priorité :
            Gagnant/Perdant/Match Nul
          </li>
          <li>
            Ensuite soit on a le score parfait (100% de la côte est attribué),
            soit on est proche du score.
          </li>
        </ol>
        Pour intéresser tout le monde à chaque match, et quelque soit le score,
        nous avons créé un niveau de proximité pour attribuer des points à ceux
        qui ont un score le plus proche possible. Ceci est défini par un niveau
        de proximité tel que défini ci-dessous :
      </p>
    </div>
    <div>
      <div className="table_section">
        <Table
          header={[
            'Niveau de proximité',
            '1ère proxi',
            '2ème proxi',
            '3ème proxi',
          ]}
          rows={[
            [
              'Pourcentage de points par rapport au score parfait',
              '60 %',
              '35 %',
              '15 %',
            ],
            [
              'Nombre de buts d’écarts si nb_buts < 3',
              'N/A',
              '1 (2 pour nuls)',
              '2+',
            ],
            ['Nombre de buts d’écarts si nb_buts < 6', '1', '2', '3+'],
            ['Nombre de buts d’écarts si nb_buts >= 6', '2', '3', '4+'],
          ]}
        />
      </div>
    </div>
  </Section>
)

export default Groups
