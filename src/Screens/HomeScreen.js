import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import Section from '../Components/section/section'
import AreaSocieties from '../Components/AreaSocieties.js'
import CarPreview from '../Components/section/car-preview/car-preview'
import { Link } from 'react-router-dom'


const HomeScreen = () => {

  const [sidebar,setSidebar] = useState(false)

  const sidebarListener = () => {
    setSidebar(!sidebar)
  }
  
  return (
    <div>
    {sidebar && <Sidebar />}
    <div className='main-content' id='panel'>
      <Navbar listener={sidebarListener} />
      <div className="d-flex justify-content-end" style={{margin:"25px 30px 0 30px"}}><Link to="/addcar">ADD NEW CAR</Link></div>
      <AreaSocieties address={"cars"} component={Section} component2={CarPreview}/>
    </div>
    </div>
  )
}

export default HomeScreen
