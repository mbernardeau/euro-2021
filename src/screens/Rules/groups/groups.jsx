import React from 'react'
import Typography from '@material-ui/core/Typography'

import Section from '../component/section'
import Table from '../component/table'

const Groups = () => (
  <Section>
    <div>
      <Typography variant="h1">Règles durant la phase de groupe</Typography>
      <p>
        Les pronostics fonctionnent avec un système de côtes basé sur notre
        propre système de calcul de côtes ! En effet, pour chaque match nous
        proposons une côte pour chaque résultat possible. Ces côtes
        multiplieront les points attribués selon les trois différents cas
        ci-dessous. Nous nous réservons le droit de changer les côtes jusqu’à la
        veille de chaque match. Les points sont attribués pour les matchs de
        poules comme suit :
        <ol>
          <li>
            Tout d’abord c’est le type de résultat qui compte en priorité :
            Gagnant/Perdant/Match Nul
          </li>
          <li>
            Ensuite soit on a le score parfait (100% de la côte est attribué),
            soit on a un score plus ou moins proche (entre 15% et 60% de la côte
            est attribué).
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
    <div>
      <p>
        <u>Exemple pour un match de poules France-Australie</u> :
      </p>
      <br />
      <div className="table_section">
        <Table
          header={[
            'Type de résultat',
            'Score pronostiqués',
            'Cote du score',
            'Vainqueur pronostiqué',
            'Score réel',
            'Vainqueur réel',
            'Points gagnés',
          ]}
          rows={[
            [
              'Bon score',
              <div>
                <div>3-1</div>
              </div>,
              <div>
                <div>11.6</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>3-1</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>11.6</div>
              </div>,
            ],
            [
              '1ere proximité',
              <div>
                <div>2-1</div>
              </div>,
              <div>
                <div>5.2</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>3-1</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>11.6 x 0.6 = 6.96</div>
              </div>,
            ],
            [
              '2eme proximité',
              <div>
                <div>2-0</div>
              </div>,
              <div>
                <div>5.3</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>3-1</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>11.6 x 0.35 = 4.06</div>
              </div>,
            ],
            [
              '3eme proximité',
              <div>
                <div>6-1</div>
              </div>,
              <div>
                <div>40.6</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>3-1</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>11.6 x 0.2 = 2.32</div>
              </div>,
            ],
            [
              'Mauvais vainqueur',
              <div>
                <div>1-2</div>
              </div>,
              <div>
                <div>9.5</div>
              </div>,
              <div>
                <div>Australie</div>
              </div>,
              <div>
                <div>3-1</div>
              </div>,
              <div>
                <div>France</div>
              </div>,
              <div>
                <div>0</div>
              </div>,
            ],
          ]}
        />
      </div>
    </div>
  </Section>
)

export default Groups
