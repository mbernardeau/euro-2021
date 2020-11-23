import React from 'react'
import ReactPlaceholder from 'react-placeholder'
import { isFunction } from 'lodash'

export default ({ isLoaded, ...placeholderConfig }) => ComposedComponent => props => {
  const ready = isFunction(isLoaded) ? isLoaded(props) : isLoaded

  return (
    <ReactPlaceholder ready={ready} type="media" rows={4} {...placeholderConfig}>
      <ComposedComponent {...props} />
    </ReactPlaceholder>
  )
}
