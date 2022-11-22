import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import queryString from 'query-string'
import EditCarInfo from '../Components/editCarInfo/editCarInfo'

const CarEditScreen = ({ location }) => {
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
        <EditCarInfo area={values.area} carnum={values.carnum} />
      </div>
      
    </div>
    </div>
  )
}

export default CarEditScreen
