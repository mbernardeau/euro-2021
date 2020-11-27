import React from 'react'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import size from 'lodash/size'
import Typography from '@material-ui/core/Typography'
import { useUserProfile } from '../../../../hooks'

const OwnRank = ({ opponents, members }) => {
  const { uid } = useUserProfile()
  const rank = findIndex(opponents, { id: uid }) + 1

  return (
    <Typography variant="caption" align="right">
      {rank}
      <sup>{rank === 1 ? 'er' : 'ème'}</sup> sur {size(members)}
    </Typography>
  )
}

OwnRank.propTypes = {
  members: PropTypes.arrayOf(PropTypes.string),
  opponents: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
  ),
}

export default OwnRank
