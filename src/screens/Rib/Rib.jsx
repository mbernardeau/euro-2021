import React from 'react'
import imgRib from '../../assets/payments/RIB.PNG'

const Rib = () => {
  return (
    <div style={styles.container}>
      <img src={imgRib} alt="RIB" />
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

export default Rib
