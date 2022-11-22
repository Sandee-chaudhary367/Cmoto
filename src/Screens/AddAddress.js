import React ,{useState}from 'react'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import AddressForm from '../Components/add-Form/address-form'

const AddAddress = () => {
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
      <AddressForm/>
      </div>
    </div>
    </div>
  )
}

export default AddAddress
