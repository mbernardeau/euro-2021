import PropTypes from 'prop-types'

const Reversible = ({ direction, children, ...rest }) => {
  const orderedChildren =
    direction === 'rtl' && children && children.reverse
      ? children.slice().reverse()
      : children
  return <div {...rest}>{orderedChildren}</div>
}

Reversible.propTypes = {
  direction: PropTypes.oneOf(['rtl', 'ltr']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Reversible
