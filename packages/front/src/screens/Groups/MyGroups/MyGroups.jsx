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
import { useGroupsForUser } from '../../../hooks'
import DisplayPrice from './DisplayPrice'
import GroupRow from './GroupRow'
import './MyGroups.scss'

const MyGroups = () => {
  const groups = useGroupsForUser()

  if (isEmpty(groups)) return null

  return (
    <Card className="my-groups-card">
      <Typography gutterBottom variant="h1">
        Mes tribus
      </Typography>

      {/* Composant qui s'affiche si membre en attente dans au moins un groupe */}
      <DisplayPrice groups={groups} />

      <CardContent className="my-groups-card-content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la tribu</TableCell>
              <TableCell>Créateur</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(groups, (groupSnapshot, key) => (
              <GroupRow group={groupSnapshot.data()} key={groupSnapshot.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

MyGroups.propTypes = {}

export default MyGroups
