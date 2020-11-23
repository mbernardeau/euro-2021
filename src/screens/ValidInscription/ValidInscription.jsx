import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import map from 'lodash/map'

import ValidInscriptionRow from './ValidInscriptionRow'

import './ValidInscription.scss'

const ValidInscription = ({ groups }) => (
  <Card className="valid-inscription-card">
    <Typography gutterBottom variant="headline" component="h2">
      Validation des inscriptions
    </Typography>
    <Typography color="textSecondary">
      Retrouvez ici les membres dont il reste encore à valider l&apos;inscription
    </Typography>
    <CardContent className="valid-inscription-content">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom Tribu</TableCell>
            <TableCell>Nom d&apos;utilisateur</TableCell>
            <TableCell>Adresse e-mail</TableCell>
            <TableCell numeric>Droit d&apos;entrée</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {map(groups, group =>
            map(group.awaitingMembers, (member, key) => (
              <ValidInscriptionRow key={`${group.id}${key}`} {...group} userId={key} />
            )),
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

ValidInscription.defaultProps = {
  groups: [],
}

ValidInscription.propTypes = {
  groups: PropTypes.array,
}

export default ValidInscription
