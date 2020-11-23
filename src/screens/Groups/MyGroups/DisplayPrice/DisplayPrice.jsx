import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { isEmpty } from 'react-redux-firebase'

import { map, filter, sum } from 'lodash'

import Typography from '@material-ui/core/Typography'

const DisplayPrice = ({ groups, userId }) => {
  const somme = sum(
    map(
      filter(groups, ({ awaitingMembers }) => !isEmpty(awaitingMembers) && awaitingMembers[userId]),
      'price',
    ),
  )

  if (somme === 0) return null

  return (
    <Fragment>
      <br />
      <Typography gutterBottom variant="subheading">
        Vous devez encore <b>{somme}€ </b> sur le site de la{' '}
        <a title="Site cagnotte" href="https://www.paypal.com/pools/c/84gsKV8QG8" target="_blank">
          cagnotte
        </a>{' '}
        pour règler votre(vos) inscription(s).
      </Typography>
    </Fragment>
  )
}

DisplayPrice.propTypes = {
  groups: PropTypes.objectOf(
    PropTypes.shape({
      awaitingMembers: PropTypes.objectOf(PropTypes.bool),
      price: PropTypes.number,
    }),
  ),
  userId: PropTypes.string.isRequired,
}

export default DisplayPrice
