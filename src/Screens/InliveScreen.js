import React,{useState} from 'react'
import Interiorlive from '../Components/Interiorlive.js'
import Navbar from '../Components/Navbar.js'
import Sidebar from '../Components/Sidebar'

const Inlive=()=>{
  const [sidebar,setSidebar] = useState(false)
  const sidebarListener = () => {
    setSidebar(!sidebar)
  }

  return (
    <div>
    {sidebar && <Sidebar />}
    <div className='main-content' id='panel'>
    <Navbar listener={sidebarListener} />
      <Interiorlive/>
    </div>
    </div>
  )
}

export default Inlive