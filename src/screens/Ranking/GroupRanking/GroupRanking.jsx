import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import orderBy from 'lodash/orderBy'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useAuth } from 'reactfire'
import InlineAvatar from '../../../components/Avatar'
import { useOpponents } from '../../../hooks'
import './GroupRanking.scss'
import OwnRank from './OwnRank'

const GroupRanking = ({ name, members }) => {
  const { uid } = useAuth().currentUser
  const opponents = useOpponents(members)
  const sortedOpponents = useMemo(
    () =>
      orderBy(opponents, (userSnapshot) => userSnapshot.data().score ?? 0, [
        'desc',
      ]),
    [opponents],
  )

  return (
    <Card className="group-ranking-card">
      <CardContent>
        <Typography variant="h1" align="center">
          {name}
        </Typography>
        <OwnRank opponents={sortedOpponents} members={members} />
        <Table>
          <TableBody>
            {sortedOpponents.map((userSnapshot, index) => {
              const user = userSnapshot.data()

              return (
                <TableRow
                  key={userSnapshot.id}
                  className={userSnapshot.id === uid ? 'own-ranking-row' : ''}
                >
                  <TableCell padding="none">
                    <Typography variant="overline">#{index + 1}</Typography>
                  </TableCell>
                  <TableCell padding="default">
                    <InlineAvatar {...user} />
                  </TableCell>
                  <TableCell padding="none">
                    {(user.score || 0).toLocaleString()} point
                    {user.score > 1 && 's'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

GroupRanking.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  selection: PropTypes.number,
}

export default GroupRanking
