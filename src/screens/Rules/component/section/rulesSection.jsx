import React from 'react'
import PropTypes from 'prop-types'
import './rulesSection.scss'

const RulesSection = props => <div className="rules-section">{props.children}</div>

RulesSection.defaultProps = {
  children: null,
}

RulesSection.propTypes = {
  children: PropTypes.node,
}

export default RulesSection
