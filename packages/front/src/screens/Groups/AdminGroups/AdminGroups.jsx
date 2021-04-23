import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import React from 'react'
import { useGroupCreatedByUser } from '../../../hooks'
import AdminGroupRow from './AdminGroupRow'
import './AdminGroups.scss'

const AdminGroups = () => {
  const groups = useGroupCreatedByUser()

  if (isEmpty(groups)) return null

  return (
    <Card className="admin-groups-card">
      <Typography gutterBottom variant="h1" component="h2">
        Administration des tribus
      </Typography>
      <br />
      <Typography gutterBottom variant="h3">
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
            {map(groups, (group) => (
              <AdminGroupRow key={group.id} group={group.data()} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

AdminGroups.defaultProps = {}

AdminGroups.propTypes = {}

export default AdminGroups
