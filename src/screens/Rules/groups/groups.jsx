import React from 'react'
import Typography from '@material-ui/core/Typography'

import data from './data.json'
import List from '../component/list'
import Section from '../component/section'
import Table from '../component/table'

const Groups = () => (
  <Section>
    <div>
      <Typography variant="body2">Règles durant la phase de groupe</Typography>
      <p>
        Les pronostics fonctionnent avec un système de cotes basé sur celles
        d’UNIBET. En effet, pour chaque match nous proposons une cote pour
        chaque résultat possible. Ces cotes multiplieront les points attribués
        selon les trois différents cas ci-dessous. Nous nous réservons le droit
        de changer les cotes jusqu’à la veille de chaque match.
      </p>
      <p>Les points sont attribués pour les matchs de poules comme suit :</p>
      <List dataSource={data.liste1} />
    </div>
    <div>
      <Typography variant="body1">Exemple phase de groupe</Typography>
      <div className="table_section">
        <Table
          header={['France', 'Match nul', 'Allemagne']}
          rows={[['1.63', '3.42', '6.24']]}
        />
      </div>
      <br />
      <div className="table_section">
        <Table
          header={[
            'Type de résultat',
            'Score pronostiqués',
            'Score réel',
            'Points gagnés',
          ]}
          rows={[
            [
              'bon score',
              <div>
                <div>2-0</div>
                <div>0-0</div>
              </div>,
              <div>
                <div>2-0</div>
                <div>0-0</div>
              </div>,
              <div>
                <div>4 x 1.63 = 6,52</div>
                <div>4 x 3.42 = 13,68</div>
              </div>,
            ],
            [
              'Bon résultat',
              <div>
                <div>2-0</div>
                <div>0-0</div>
              </div>,
              <div>
                <div>1-0, 3-0, etc...</div>
                <div>1-1, 3-3, etc...</div>
              </div>,
              <div>
                <div>2 x 1.63 = 3,26</div>
                <div>2 x 3.42 = 6.84</div>
              </div>,
            ],
            ['Mauvais résultat', '2-0', '0-0, 0-1, etc...', '0'],
          ]}
        />
      </div>
      <p>
        <u>Remarque</u> : Des précisions sont données dans la section suivante
        pour les matchs nuls durant la phase finale.
      </p>
    </div>
  </Section>
)

export default Groups
