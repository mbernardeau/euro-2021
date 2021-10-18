import JoinGroup from './JoinGroup'
import CreateGroup from './CreateGroup'
import AdminGroups from './AdminGroups'
import MyGroups from './MyGroups'

import './groups.scss'

const Groups = () => (
  <div className="groups-container">
    <MyGroups />
    <JoinGroup />
    <CreateGroup />
    <AdminGroups />
  </div>
)

export default Groups
