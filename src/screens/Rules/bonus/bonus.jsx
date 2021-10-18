import Typography from '@mui/material/Typography'
import Section from '../component/section'
import Table from '../component/table'

const Bonus = () => (
  <Section>
    <Typography variant="h1">Règles additionnelles</Typography>
    <br />
    <Typography variant="h2" color="inherit">
      Vainqueur final
    </Typography>
    <p>
      Chaque joueur pronostique également le champion de l'EURO 2021 avant que
      la compétition commence. Si jamais celui-ci est trouvé par le parieur une
      fois la compétition terminée, la cote associée au pays pronostiqué est
      ajouté aux autres points gagnés durant toute la compétition.
    </p>
    <div>
      <Typography variant="h2">
        Répartition des points sur toute la durée du concours
      </Typography>
      <p>
        On a choisit de répartir le nombre de points de façon la plus équilibrée
        possible, ce qui permet à tous de rester concerné tout au long du
        déroulé du concours. Les retournements de situations sont toujours
        possibles !
      </p>
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
            ['% points total', '45', '16.5', '12.5', '9', '7', '10'],
          ]}
        />
      </div>
    </div>
    <div>
      <p>
        Cette répartition des points est intégrée directement dans les côtes des
        matches et vainqueurs finaux. Vous pouvez donc directement savoir les
        points à gagner en regardant la côte.
      </p>
    </div>
  </Section>
)

export default Bonus
