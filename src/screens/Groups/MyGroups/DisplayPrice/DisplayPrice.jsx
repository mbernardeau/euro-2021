import Typography from '@material-ui/core/Typography'
import includes from 'lodash/includes'
import sumBy from 'lodash/sumBy'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
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
      <Typography gutterBottom variant="h4">
        Vous pouvez également cette somme par paiement liquide à l'un des
        organisateurs ou par <Link to="/rib">virement bancaire</Link>.
      </Typography>
      <Typography gutterBottom variant="h4">
        Dans tous les cas, il faut renseigner votre pseudo ainsi que le nom de
        la/des tribu(es) auxquelles vous vous inscrivez.
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
