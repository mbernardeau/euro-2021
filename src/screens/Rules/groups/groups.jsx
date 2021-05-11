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
              '35 %',
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
      <br />
      <Typography variant="h1">Règles durant la phase finale</Typography>
      <p>
        Le fonctionnement des paris à partir de ce niveau de la compétition est
        identique à celui de la phase de groupe, à un détail près : le score
        final est celui au bout de 90 minutes. À ce pronostic, on ajoute le fait
        qu’il faut donner le vainqueur en cas de prolongation, voire tirs au
        but. On a donc pour résumer un pronostic à faire sur le score final
        (comme durant la phase de groupe) et un pronostic à faire sur le
        vainqueur de la partie. Pas bon ici
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      </p>
      <p>
        Répartition des points sur toute la durée du concours : On choisit de
        répartir le nombre de points de façon la plus équilibrée possible, et
        qui permette à tous de rester concerné tout au long du déroulé du
        concours.
      </p>
    </div>
    <div>
      <Typography variant="body1">
        Voici le choix de répartition de points par phase{' '}
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
            'Vainqueur Finale',
          ]}
          rows={[
            ['Nombres de matchs', '36', '8', '4', '2', '1', 'N/A'],
            ['% points par phase', '13', '13', '13', '13', '13', '13'],
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
        !
        <Table
          header={['Niveau de la compétition', 'Coefficient Multiplicateur']}
          rows={[
            ['match de poule', 'Cote x 3'],
            ['8ème de finale', 'Cote x 5'],
            ['4rts de finale', 'Cote x 10'],
            ['demi finale', 'Cote x 20'],
            ['finale', 'Cote x 40'],
            ['Vainqueur Finale', 'Cote x 40'],
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
        • D’abord le type de résultat est preponderant : Johan a 0 points car il
        avait parié pour l’australie. • Ensuite, on prend la cote lie au score
        3-1 : la cote est de 3.6 • Ensuite on donne le maximum au bon score qui
        gagne le plus de points: Tom gagne 100% de la cote 3.6 points !!!
      </p>
      <p> Maintenant arrive les proximités pour les autres joueurs :</p>
      <p>
        • Celine est la plus proche avec son pronostic de 2-1, elle est en 1ere
        proximité et gagne 60% de la cote du score (3.6) = 2.16 points : (!)
        Attention, ne pas confondre avec la cote du score pronostique (1.6 ici )
        • Beatrice est un peu plus loin avec son 2-0 et est en 2eme proximité,
        elle gagne 35% de la cote du score (3.6) = 1.26 points • Kim avec son
        pari ose de 6-1 gagne que peu de points car elle est en 3eme proximité
        20% de la cote du score (3.6) = 0.72 points
      </p>
      <Typography variant="body2">
        Exemple 2 : 5 parieurs pour le match Espagne-Italie :
      </Typography>
      <p>
        • Celine parie : 1-1 (vainqueur: Espagne) (cote de 1.6) • Tom parie :
        1-2 (vainqueur: Italie) (cote de 2.0) • Beatrice parie : 3-1 (vainqueur:
        Espagne) (cote de 3.2) • Johan parie : 1-0 (vainqueur: Espagne) (cote de
        2.1) • Kim parie : 3-3 (vainqueur: Espagne) (le fou) (cote de 8)
      </p>
      <p>
        Imprévisible le résultat du match tombe : l’Espagne gagne 5-4 après
        prolongations 3-3 à 90 minutes après un match extraordinaire
      </p>
      <p>D’abord le résultat pré-pondère : </p>
      <p>
        • Tom a 0 points • Ensuite, on prend la côte lié au score 3-3 =&gt; cote
        = 8 et le facteur multiplicateur de phase =&gt; phase = 6.88 (en exemple
        pour un match de demi)
      </p>
      <p>
        Ensuite on donne le maximum au bon score (à 90 minutes) qui gagne le
        plus de points :
      </p>
      <p>
        • Kim gagne 100% de la côte multiplié par la phase donc (8*6.88 =) 55.06
        points!!! (parfois ça paye d’être fou)
      </p>
      <p>
        Maintenant arrive les proximités pour les autres joueurs, à match
        exceptionnel récompenses exceptionnelles :
      </p>
      <p>
        • Béatrice est la plus proche avec son pronostic de 3-1 (beaucoup de
        buts), elle est en 2eme proximité et gagne 35% du total côte du score
        fois multiplicateur de phase (8*6.88*0.35 = 19.26 points) • Celine et
        Johan sont un peu plus loin avec leur 1-1 (Espagne) et sont en 3eme
        proximité et gagne 20% du total côte du score fois multiplicateur de
        phase (8*6.88*0.2 = 11.02 points)
      </p>
      <p>Voilà vous avez maintenant bien compris comment cela marche.</p>
    </div>
  </Section>
)

export default Groups
