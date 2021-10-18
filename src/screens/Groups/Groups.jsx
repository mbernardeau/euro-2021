import AdminGroups from './AdminGroups'
import CreateGroup from './CreateGroup'
import './groups.scss'
import JoinGroup from './JoinGroup'
import MyGroups from './MyGroups'

const Groups = () => (
  <div className="groups-container">
    <MyGroups />
    <JoinGroup />
    <CreateGroup />
    <AdminGroups />
  </div>
)

export default Groups
