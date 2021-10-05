import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
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
