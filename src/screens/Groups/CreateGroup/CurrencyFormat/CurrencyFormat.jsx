import React from 'react'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

const CurrencyFormat = ({ inputRef, onChange, ...other }) => (
  <NumberFormat
    {...other}
    ref={inputRef}
    onValueChange={values => {
      onChange({
        target: {
          value: values.value,
        },
      })
    }}
    suffix="€"
  />
)

CurrencyFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CurrencyFormat
