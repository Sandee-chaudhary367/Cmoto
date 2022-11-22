import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import queryString from 'query-string'
import EditEmpInfo from '../Components/editEmpInfo/editEmpInfo'

const EmpEditScreen = ({ location }) => {
  const values = queryString.parse(location.search)

  const [sidebar,setSidebar] = useState(false)

  const sidebarListener = () => {
    setSidebar(!sidebar)
  }

  return (
    <div>
    {sidebar && <Sidebar />}
    <div className='main-content' id='panel'>
    <Navbar listener={sidebarListener} />
      <div className='container-fluid' style={{ paddingTop: 25 }}>
        <EditEmpInfo uid={values.uid} addres={values.address} />
      </div>
      
    </div>
    </div>
  )
}

export default EmpEditScreen
