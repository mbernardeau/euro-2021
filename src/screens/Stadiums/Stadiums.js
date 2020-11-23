import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import Stadium from './Stadium'

const Stadiums = ({ stadiums }) => (
  <div style={styles.container}>
    {map(stadiums, (stadium, key) => <Stadium stadium={stadium} key={key} />)}
  </div>
)

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

export default Stadiums
