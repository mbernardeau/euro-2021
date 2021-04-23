import Typography from '@material-ui/core/Typography'
import includes from 'lodash/includes'
import sumBy from 'lodash/sumBy'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useAuth } from 'reactfire'

const DisplayPrice = ({ groups }) => {
  const { uid } = useAuth().currentUser

  const somme = useMemo(
    () =>
      sumBy(
        groups
          .map((groupSnapshot) => groupSnapshot.data())
          .filter(({ awaitingMembers }) => includes(awaitingMembers, uid)),
        'price',
      ),
    [groups, uid],
  )

  if (!somme) return null

  return (
    <>
      <br />
      <Typography gutterBottom variant="h2">
        Vous devez encore <b>{somme}€ </b> sur le site de la{' '}
        <a
          title="Site cagnotte"
          href="https://www.paypal.com/pools/c/84gsKV8QG8"
          target="_blank"
          rel="noreferrer"
        >
          cagnotte
        </a>{' '}
        pour règler votre(vos) inscription(s).
      </Typography>
    </>
  )
}

DisplayPrice.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.func.isRequired,
    }),
  ),
}

export default DisplayPrice
