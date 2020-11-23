import React from 'react'
import PropTypes from 'prop-types'

import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'

import GroupRow from './GroupRow'
import DisplayPrice from './DisplayPrice'

import './MyGroups.scss'

const MyGroups = ({ groups, userId }) =>
  isEmpty(groups) ? null : (
    <Card className="my-groups-card">
      <Typography gutterBottom variant="headline">
        Mes tribus
      </Typography>

      {/* Composant qui s'affiche si membre en attente dans au moins un groupe */}
      <DisplayPrice groups={groups} userId={userId} />

      <CardContent className="my-groups-card-content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la tribu</TableCell>
              <TableCell>Créateur</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{map(groups, (group, key) => <GroupRow {...group} key={key} />)}</TableBody>
        </Table>
      </CardContent>
    </Card>
  )

MyGroups.propTypes = {
  groups: PropTypes.objectOf(PropTypes.shape({})),
  userId: PropTypes.string.isRequired,
}

export default MyGroups
