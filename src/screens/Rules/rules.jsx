import Bonus from './bonus'
import Groups from './groups'
import Playoff from './playoff'
import './rules.css'
import Subscription from './subscription'

const Rules = () => (
  <>
    <div id="img1" className="img-rules" />
    <Subscription />
    <div id="img2" className="img-rules" />
    <Groups />
    <div id="img3" className="img-rules" />
    <Playoff />
    <div id="img4" className="img-rules" />
    <Bonus />
  </>
)

export default Rules
