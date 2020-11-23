import React, { Fragment } from 'react'

import './rules.css'

import Bonus from './bonus'
import Subscription from './subscription'
import Groups from './groups'
import Playoff from './playoff'

const Rules = () => (
  <Fragment>
    <div id="img1" className="img-rules" />
    <Groups />
    <div id="img2" className="img-rules" />
    <Playoff />
    <div id="img3" className="img-rules" />
    <Bonus />
    <div id="img4" className="img-rules" />
    <Subscription />
  </Fragment>
)

export default Rules
