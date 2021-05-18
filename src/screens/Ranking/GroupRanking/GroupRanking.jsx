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
import { useOpponents, useTeams } from '../../../hooks'
import './GroupRanking.scss'
import OwnRank from './OwnRank'
import Flag from '../../../components/Flag'
import imgUrl from '../../../assets/icons/mask6.png'
import forgotBetImgUrl from '../../../assets/icons/ForgotBet.png'
import { Tooltip } from '@material-ui/core'

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

  const teams = useTeams()

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

              const team = user.winnerTeam
                ? teams.find((a) => a.id === user.winnerTeam).data()
                : null

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
                    {(user.score || 0).toLocaleString()} points
                  </TableCell>
                  <TableCell padding="default">
                    {team ? (
                      team.elimination ? (
                        <Tooltip
                          title="Vainqueur final éliminé"
                          placement="right"
                        >
                          <Flag
                            country={team.code}
                            className="bet-winner-beaten"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Vainqueur final mystère"
                          placement="right"
                        >
                          <img
                            src={imgUrl}
                            className="bet-winner-unknown"
                            alt="Équipe non éliminée"
                          />
                        </Tooltip>
                      )
                    ) : (
                      <Tooltip
                        title="Cette personne a oublié de parier son vainqueur final"
                        placement="right"
                      >
                        <img
                          src={forgotBetImgUrl}
                          className="bet-winner-unknown"
                          alt="Aucun vainqueur sélectionné"
                        />
                      </Tooltip>
                    )}
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
