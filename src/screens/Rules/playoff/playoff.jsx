import React from 'react'
import Typography from '@material-ui/core/Typography'
import Section from '../component/section'
import Table from '../component/table'

const Playoff = () => (
  <Section>
    <div>
      <Typography variant="h1">Règles durant la phase finale</Typography>
      <p>
        Le fonctionnement des paris à partir de ce niveau de la compétition est
        identique à celui de la phase de groupe, à un détail près,
        <b> le score final est celui au bout de 90 minutes</b>. Néanmoins, en
        cas de match nul, il faut préciser le vainqueur en cas de prolongation,
        voire tirs au but. Vous gagnerez ainsi des points si vous avez au moins
        le bon vainqueur (voir plus grâce à la proximité au score car les scores
        nuls rentrent en compte).
      </p>
    </div>
    <div>
      <p>
        <u>Exemple pour un match de 8ème de finale Espagne-Italie</u> :
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
                <div>5-4</div>
              </div>,
              <div>
                <div>55.04</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>5-4</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>55.04</div>
              </div>,
            ],
            [
              '1ere proximité',
              <div>
                <div>4-4</div>
              </div>,
              <div>
                <div>40.12</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>5-4</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>55.04 x 0.6 = 33.02</div>
              </div>,
            ],
            [
              '2eme proximité',
              <div>
                <div>3-1</div>
              </div>,
              <div>
                <div>25.6</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>5-4</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>55.04 x 0.35 = 19.26</div>
              </div>,
            ],
            [
              '3eme proximité',
              <div>
                <div>1-1</div>
              </div>,
              <div>
                <div>12.8</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>5-4</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>55.04 x 0.2 = 11.02</div>
              </div>,
            ],
            [
              '4eme proximité',
              <div>
                <div>1-1</div>
              </div>,
              <div>
                <div>12.8</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>5-4</div>
              </div>,
              <div>
                <div>Espagne</div>
              </div>,
              <div>
                <div>55.04 x 0.1 = 5.01</div>
              </div>,
            ],
            [
              'Mauvais vainqueur',
              <div>
                <div>1-2</div>
              </div>,
              <div>
                <div>16.0</div>
              </div>,
              <div>
                <div>Italie</div>
              </div>,
              <div>
                <div>5-4</div>
              </div>,
              <div>
                <div>Espagne</div>
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

export default Playoff
