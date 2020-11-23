import React from 'react'
import PropTypes from 'prop-types'

import memoize from 'lodash/memoize'

export const imgUrl = memoize(country => require(`../assets/flags/${country}.svg`)) // eslint-disable-line global-require

const Flag = ({ country, className, style }) => {
  if (!country) return null

  return <img src={imgUrl(country).default} alt={country} className={className} style={style} />
}

Flag.propTypes = {
  country: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Flag
