import React ,{useState}from 'react'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import CarForm from '../Components/add-Form/carForm'


const AddCar = () => {
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
      <CarForm/>
      </div>
    </div>
    </div>
  )
}

export default AddCar
