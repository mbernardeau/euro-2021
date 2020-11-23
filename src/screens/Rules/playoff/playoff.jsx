import React from 'react'
import Typography from '@material-ui/core/Typography'
import Section from '../component/section'
import Table from '../component/table'

const Playoff = () => (
  <Section>
    <div>
      <Typography variant="body2">Règles durant la phase finale</Typography>
      <p>
        Le fonctionnement des paris à partir de ce niveau de la compétition est identique à celui de
        la phase de groupe, à un détail près :
        <b> le score final est celui au bout de 90 minutes. </b>
        À ce pronostic, on ajoute le fait
        <b>&nbsp;qu’il faut donner le vainqueur en cas de prolongation, voire tirs au but</b>. On a
        donc pour résumer un pronostic à faire sur le score final (comme durant la phase de groupe)
        et un pronostic à faire sur le vainqueur de la partie.
      </p>
      <p>
        <u>Répartition des points pour la phase finale</u> :
      </p>
      <div className="table_section">
        <Table
          header={[
            'Niveau de la compétition',
            'Bon score',
            'Bon résultat',
            'Mauvais résultat',
            'Bon vainqueur',
          ]}
          rows={[
            ['8èmes de finale', '5 points', '2 points', '0 points', '+2 points'],
            ['4rts de finale', '8 points', '3 points', '0 points', '+3 points'],
            ['demi-finale', '13 points', '5 points', '0 points', '+5 points'],
            ['3ieme place', '15 points', '6 points', '0 points', '+6 points'],
            ['Finale', '22 points', '8 points', '0 points', '+8 points'],
          ]}
        />
      </div>
    </div>
    <div>
      <Typography variant="body1">Exemple phase finale</Typography>
      <p>
        <u>Exemple pour un match de 8ème de finale</u> :
      </p>
      <p className="floatdiv">Cotes du résultat au bout des 90 minutes :</p>
      <div className="table_section">
        <Table header={['France', 'Match nul', 'Allemagne']} rows={[['1.63', '3.42', '6.24']]} />
      </div>
      <br />
      <p className="floatdiv">Cotes du vainqueur du match :</p>
      <div className="table_section">
        <Table header={['France', 'Allemagne']} rows={[['1.4', '2.5']]} />
      </div>
      <br />
      <div className="table_section">
        <Table
          header={[
            'Type de résultat',
            'Score pronostiqués',
            'Vainqueur pronostiqué',
            'Score réel',
            'Vainqueur réel',
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
                <div>France</div>
                <div>France</div>
              </div>,
              <div>
                <div>2-0</div>
                <div>0-0</div>
              </div>,
              <div>
                <div>France</div>
                <div>Allemagne</div>
              </div>,
              <div>
                <div>5 x 1.63 + 2 x 1.4 = 10.95</div>
                <div>5 x 3.42 = 17.1</div>
              </div>,
            ],
            [
              'Bon résultat',
              <div>
                <div>2-0</div>
                <div>0-0</div>
              </div>,
              <div>
                <div>France</div>
                <div>France</div>
              </div>,
              <div>
                <div>1-0, 3-0, etc...</div>
                <div>1-1, 3-3, etc...</div>
              </div>,
              <div>
                <div>France</div>
                <div>Allemagne</div>
              </div>,
              <div>
                <div>2 x 1.63 + 2 x 1.4 = 6.06</div>
                <div>2 x 3.42 = 6.84</div>
              </div>,
            ],
            [
              'Mauvais résultat',
              <div>
                <div>2-0</div>
                <div>0-0</div>
              </div>,
              <div>
                <div>France</div>
                <div>France</div>
              </div>,
              <div>
                <div>0-0</div>
                <div>0-2</div>
              </div>,
              <div>
                <div>France</div>
                <div>Allemagne</div>
              </div>,
              <div>
                <div>2 x 1.4 = 2.8</div>
                <div>0</div>
              </div>,
            ],
          ]}
        />
      </div>
    </div>
  </Section>
)

export default Playoff
