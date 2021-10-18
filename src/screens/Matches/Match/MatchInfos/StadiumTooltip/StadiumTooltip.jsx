import PropTypes from 'prop-types'
import { memo } from 'react'
import './stadiumTooltip.scss'

const StadiumTooltip = ({ name, photo, city, capacity }) => (
  <div className="stadium-tooltip">
    <div className="stadium-tooltip-title">
      <div>{name}</div>
      <div>•</div>
      <div>{city}</div>
    </div>
    {photo && (
      <img className="stadium-tooltip-photo" src={photo.url} alt={name} />
    )}
    <div className="stadium-tooltip-title">
      <div>Capacité</div>
      <div>{capacity.toLocaleString('fr')} places</div>
    </div>
  </div>
)

StadiumTooltip.defaultProps = {
  capacity: 0,
  name: '',
  city: '',
}

StadiumTooltip.propTypes = {
  name: PropTypes.string,
  city: PropTypes.string,
  photo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    credit: PropTypes.string,
  }),
  capacity: PropTypes.number,
}

export default memo(StadiumTooltip)
