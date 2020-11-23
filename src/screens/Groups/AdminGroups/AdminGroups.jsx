import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import AdminGroupRow from './AdminGroupRow'

import './AdminGroups.scss'

const AdminGroups = ({ groups }) =>
  isEmpty(groups) ? null : (
    <Card className="admin-groups-card">
      <Typography gutterBottom variant="headline" component="h2">
        Administration des tribus
      </Typography>
      <br />
      <Typography gutterBottom variant="subheading">
        Retrouvez ici les tribus que vous avez créé.
      </Typography>
      <CardContent className="admin-groups-card-content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de tribu</TableCell>
              <TableCell>Membres</TableCell>
              <TableCell>Membres en attente</TableCell>
              <TableCell numeric>Droit d&apos;entrée</TableCell>
              <TableCell>Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(groups, (group, key) => <AdminGroupRow key={key} {...group} />)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

AdminGroups.defaultProps = {
  groups: [],
}

AdminGroups.propTypes = {
  groups: PropTypes.array,
}

export default AdminGroups
