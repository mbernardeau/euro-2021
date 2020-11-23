import React from 'react'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import size from 'lodash/size'
import Typography from '@material-ui/core/Typography'

const OwnRank = ({ users, members, userId }) => {
  const rank = findIndex(users, { id: userId }) + 1

  return (
    <Typography variant="caption" align="right">
      {rank}
      <sup>{rank === 1 ? 'er' : 'ème'}</sup> sur {size(members)}
    </Typography>
  )
}

OwnRank.propTypes = {
  userId: PropTypes.string.isRequired,
  members: PropTypes.objectOf(PropTypes.bool),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
}

export default OwnRank
