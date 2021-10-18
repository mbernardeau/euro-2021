import PropTypes from 'prop-types'
import map from 'lodash/map'
import Item from './item'
import './list.css'

const List = (props) => (
  <div className="rule_list">
    {map(props.dataSource, (donnee, id) => (
      <Item donnee={donnee} key={id} />
    ))}
  </div>
)

List.defaultProps = {
  dataSource: [],
}

List.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.node),
}

export default List
