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
        <b>le score final est celui au bout de 90 minutes</b>. Néanmoins, en cas
        de match nul, il faut préciser le vainqueur en cas de prolongation,
        voire tirs au but. On a donc pour résumer un pronostic à faire sur le
        score final (comme durant la phase de groupe) et un pronostic à faire
        sur le vainqueur de la partie. Pas bon ici
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      </p>
      <p>
        Répartition des points sur toute la durée du concours : On choisit de
        répartir le nombre de points de façon la plus équilibrée possible, et
        qui permette à tous de rester concerné tout au long du déroulé du
        concours. Les retournements de situations sont toujours possibles !
      </p>
    </div>
    <div>
      <Typography variant="body1">
        Voici le choix de répartition de points par phase
      </Typography>
      <br />
      <div className="table_section">
        <Table
          header={[
            'Phase',
            'Poules',
            '8ème de finale',
            '4ème de finale',
            'demi finale',
            'finale',
            'Vainqueur final',
          ]}
          rows={[
            ['Nombres de matchs', '36', '8', '4', '2', '1', 'N/A'],
            ['% points total', '35', '13', '13', '13', '13', '13'],
          ]}
        />
      </div>
    </div>
    <div>
      <p>
        Cela donne donc un coefficient de multiplication à opérer à chaque match
        du concours et du premier match à la finale :
      </p>
    </div>
    <div>
      <Typography variant="body1">Voici la pondération par match </Typography>
      <br />
      <div className="table_section">
        <Table
          header={[
            'Niveau de la compétition',
            'match de poule',
            '8ème de finale',
            '4rts de finale',
            'demi finale',
            'finale',
            'Vainqueur Final',
          ]}
          rows={[
            [
              'Coefficient Multiplicateur',
              'Cote x 3',
              'Cote x 5',
              'Cote x 10',
              'Cote x 20',
              'Cote x 40',
              'Cote x 40',
            ],
          ]}
        />
      </div>
    </div>
    <div>
      <p>De façon a pouvoir mieux comprendre, voici deux exemples de pari</p>
      <Typography variant="body2">
        Exemple Perdant/Gagnant : 5 parieurs pour le match France-Australie :
      </Typography>
      <p>
        <ul>
          <li>Celine parie : 2-1 (cote de 1.6)</li>
          <li>Tom parie : 3-1 (cote de 3.6)</li>
          <li>Beatrice parie : 2-0 (cote de 2.2)</li>
          <li>Johan parie : 1-2 (le traître) (cote de 3.5)</li>
          <li>Kim parie : 6-1 (le fou) (cote de 8)</li>
        </ul>
      </p>
      <p>
        Le résultat du match tombe : la France gagne 3-1 apres un match
        endiablé.(On s’y attendait)
      </p>
      <p>
        <ul>
          <li>
            D’abord le type de résultat est preponderant : Johan a 0 points car
            il avait parié pour l’australie.
          </li>
          <li>
            Ensuite, on prend la cote lie au score 3-1 : la cote est de 3.6
          </li>
          <li>
            Ensuite on donne le maximum au bon score qui gagne le plus de
            points: Tom gagne 100% de la cote 3.6 points !!!
          </li>
        </ul>
      </p>
      <p> Maintenant arrive les proximités pour les autres joueurs :</p>
      <p>
        <ul>
          <li>
            Celine est la plus proche avec son pronostic de 2-1, elle est en
            1ere proximité et gagne 60% de la cote du score (3.6) = 2.16 points
            : (!) Attention, ne pas confondre avec la cote du score pronostique
            (1.6 ici )
          </li>
          <li>
            Beatrice est un peu plus loin avec son 2-0 et est en 2eme proximité,
            elle gagne 35% de la cote du score (3.6) = 1.26 points
          </li>
          <li>
            Kim avec son pari ose de 6-1 gagne que peu de points car elle est en
            3eme proximité 20% de la cote du score (3.6) = 0.72 points
          </li>
        </ul>
      </p>
      <Typography variant="body2">
        Exemple 2 : 5 parieurs pour le match Espagne-Italie :
      </Typography>
      <p>
        <ul>
          <li>Celine parie : 1-1 (vainqueur: Espagne) (cote de 1.6)</li>
          <li>Tom parie : 1-2 (vainqueur: Italie) (cote de 2.0)</li>
          <li>Beatrice parie : 3-1 (vainqueur: Espagne) (cote de 3.2)</li>
          <li>Johan parie : 1-0 (vainqueur: Espagne) (cote de 2.1)</li>
          <li>Kim parie : 3-3 (vainqueur: Espagne) (le fou) (cote de 8)</li>
        </ul>
      </p>
      <p>
        Imprévisible le résultat du match tombe : l’Espagne gagne 5-4 après
        prolongations 3-3 à 90 minutes après un match extraordinaire
      </p>
      <p>D’abord le résultat pré-pondère : </p>
      <p>
        <ul>
          <li>Tom a 0 points</li>
          <li>
            Ensuite, on prend la côte lié au score 3-3 =&gt; cote = 8 et le
            facteur multiplicateur de phase =&gt; phase = 6.88 (en exemple pour
            un match de demi)
          </li>
        </ul>
      </p>
      <p>
        Ensuite on donne le maximum au bon score (à 90 minutes) qui gagne le
        plus de points :
      </p>
      <p>
        <ul>
          <li>
            Kim gagne 100% de la côte multiplié par la phase donc (8*6.88 =)
            55.06 points!!! (parfois ça paye d’être fou)
          </li>
        </ul>
      </p>
      <p>
        Maintenant arrive les proximités pour les autres joueurs, à match
        exceptionnel récompenses exceptionnelles :
      </p>
      <p>
        <ul>
          <li>
            Béatrice est la plus proche avec son pronostic de 3-1 (beaucoup de
            buts), elle est en 2eme proximité et gagne 35% du total côte du
            score fois multiplicateur de phase (8*6.88*0.35 = 19.26 points)
          </li>
          <li>
            Celine et Johan sont un peu plus loin avec leur 1-1 (Espagne) et
            sont en 3eme proximité et gagne 20% du total côte du score fois
            multiplicateur de phase (8*6.88*0.2 = 11.02 points)
          </li>
        </ul>
      </p>
      <p>Voilà vous avez maintenant bien compris comment cela marche.</p>
    </div>
    <div>
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
            [
              '8ièmes de finale',
              '5 points',
              '2 points',
              '0 points',
              '+2 points',
            ],
            ['4rts de finale', '8 points', '3 points', '0 points', '+3 points'],
            ['demi-finale', '13 points', '5 points', '0 points', '+5 points'],
            ['3ième place', '15 points', '6 points', '0 points', '+6 points'],
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
        <Table
          header={['France', 'Match nul', 'Allemagne']}
          rows={[['1.63', '3.42', '6.24']]}
        />
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
