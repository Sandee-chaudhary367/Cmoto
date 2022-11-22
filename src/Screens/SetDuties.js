import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar.js'
import DragAndDrop from '../Components/dragAndDrop'
import queryString from 'query-string'
import Sidebar from '../Components/Sidebar'
import AreaSocieties from '../Components/AreaSocieties.js'
import AreaTable from '../Components/AreaTable.js'


const SetDuties = ({ location }) => {
  var values = queryString.parse(location.search)
 const [sidebar,setSidebar] = useState(false)

  useEffect(() => {
    values = queryString.parse(location.search)
  }, [values])

 
  const sidebarListener = () => {
    setSidebar(!sidebar)
  }

  return (
    <div>
    {sidebar && <Sidebar />}
    <div className='main-content' id='panel'>
    <Navbar listener={sidebarListener} />
      <div className='container-fluid' style={{ paddingTop: 15 }}>
        {values.society ? (
          <DragAndDrop society={values.society} />
        ) : (
          <AreaSocieties address={"Employees"} component={AreaTable}/>
        )}
      </div>
    </div>
    </div>
  )
}

export default SetDuties
