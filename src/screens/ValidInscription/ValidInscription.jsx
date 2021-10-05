import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import { useGroupsContainingAwaitingMembers } from '../../hooks'
import { useUsers } from '../../hooks/users'
import './ValidInscription.scss'
import ValidInscriptionRow from './ValidInscriptionRow'

const ValidInscription = () => {
  const groupsSnapshots = useGroupsContainingAwaitingMembers()

  return (
    <Card className="valid-inscription-card">
      <Typography gutterBottom variant="h1" component="h2">
        Validation des inscriptions
      </Typography>
      <Typography color="textSecondary">
        Retrouvez ici les membres dont il reste encore à valider
        l&apos;inscription
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
            {map(groupsSnapshots, (groupSnapshot) => (
              <ValidInscriptionGroupRows
                group={groupSnapshot.data()}
                key={groupSnapshot.id}
                groupId={groupSnapshot.id}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const ValidInscriptionGroupRows = ({ group, groupId }) => {
  const users = useUsers(group.awaitingMembers)

  return (
    <>
      {users.map((user) => (
        <ValidInscriptionRow
          key={user.id}
          group={group}
          groupId={groupId}
          user={user.data()}
        />
      ))}
    </>
  )
}

ValidInscription.defaultProps = {
  groups: [],
}

ValidInscription.propTypes = {
  groups: PropTypes.array,
}

export default ValidInscription
