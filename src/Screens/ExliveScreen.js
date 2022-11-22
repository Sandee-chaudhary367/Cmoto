import React, { useState } from 'react'
import AreaSocieties from '../Components/AreaSocieties.js'
import Navbar from '../Components/Navbar.js'
import ExlivePreview from '../Components/section/exlive-preview/exlive-preview.jsx'
import Section from '../Components/section/section.jsx'
import Sidebar from '../Components/Sidebar'

const Exlive=()=>{
  const [sidebar,setSidebar] = useState(false)
  const sidebarListener = () => {
    setSidebar(!sidebar)
  }

  return (
    <div>
    {sidebar && <Sidebar />}
    <div className='main-content' id='panel'>
    <Navbar listener={sidebarListener} />
      <AreaSocieties address={"Employees"} component={Section} component2={ExlivePreview}/>
    </div>
    </div>
)
}
export default Exlive