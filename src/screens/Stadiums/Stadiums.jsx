import { Suspense } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import Stadium from './Stadium'
import { useStadiums } from '../../hooks/stadiums'

const Stadiums = () => {
  const stadiums = useStadiums()

  return (
    <div style={styles.container}>
      {map(stadiums, (documentSnapshot) => (
        <Stadium stadium={documentSnapshot.data()} key={documentSnapshot.id} />
      ))}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '0 15px',
  },
}

Stadiums.propTypes = {
  stadiums: PropTypes.object,
}

const StadiumsSuspense = (props) => {
  return (
    <Suspense fallback="Loading stadiums...">
      <Stadiums {...props} />
    </Suspense>
  )
}

export default StadiumsSuspense
