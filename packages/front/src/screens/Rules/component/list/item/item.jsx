import React from 'react'
import PropTypes from 'prop-types'
import './item.css'

const Item = (props) => <li>{props.donnee}</li>

Item.defaultProps = {
  donnee: '',
}

Item.propTypes = {
  donnee: PropTypes.node,
}

export default Item
