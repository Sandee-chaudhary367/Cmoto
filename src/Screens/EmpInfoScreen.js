import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import queryString from 'query-string'
import EmpInfo from '../Components/empInfo/empinfo.jsx'
import EmpWorkHistory from '../Components/empwork-history/empwork-history'

const EmpInfoScreen = ({ match, location }) => {
  const values = queryString.parse(location.search)
  const [sidebar,setSidebar] = useState(false)

  const sidebarListener = () => {
    setSidebar(!sidebar)
  }
  let address=values.address;
  address = address.slice(0,address.length - 1);
  return (
    <div>
    {sidebar && <Sidebar />}
    <div className='main-content' id='panel'>
    <Navbar listener={sidebarListener} />
      <div className='container-fluid' style={{ paddingTop: 25 }}>
        <EmpInfo address={address} uid={values.uid} />
        <EmpWorkHistory address={address} uid={values.uid}  />
      </div>
     
    </div>
    </div>
  )
}

export default EmpInfoScreen
