import React ,{useState} from 'react'
import AreaSocieties from '../Components/AreaSocieties.js'
import Navbar from '../Components/Navbar.js'
import EmpPreview from '../Components/section/emp-preview/emp-preview.jsx'
import Section from '../Components/section/section.jsx'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'


const EmpScreen=()=>{
  
  const [sidebar,setSidebar] = useState(false)
  let [a, setA] = useState(true)
  let [b, setB] = useState(true)

  const toggleA = function () {
    setA(!a)
    setB(true)
  }

  const toggle = function () {
    setB(!b)
    setA(true)
  }

  const color = function (ele) {
    return ele ? 'white' : 'black'
  }

  const textcolor = function (ele) {
    return ele ? 'black' : 'white'
  }

 

  const sidebarListener = () => {
    setSidebar(!sidebar)
  }

  return (
    <div>
    {sidebar && <Sidebar />}
    <div className='main-content' id='panel'>
    <Navbar listener={sidebarListener} />
      <div className="d-flex justify-content-end" style={{margin:"25px 30px 0 30px"}}><Link to="/addemployee">ADD NEW EMPLOYEE</Link></div>
      <div className='d-flex justify-content-between' style={{ paddingTop: 25 }}>
          <button
            style={{
              paddingTop: '20',
              width: '33%',
              background: color(a),
              color: textcolor(a),
            }}
            onClick={toggleA}
            className='container-fluid'
          >
            Exterior Empolyee
          </button>
          <button
            style={{
              paddingTop: '20',
              width: '33%',
              background: color(b),
              color: textcolor(b),
            }}
            onClick={toggle}
            className='container-fluid'
          >
            Interior Employee
          </button>
        </div>

        <div className='container-fluid' style={{ paddingTop: 25 }}>
        {a ? null : <AreaSocieties address={"Employees"} component={Section} component2={EmpPreview}/>}
        {b ? null : <AreaSocieties address={"InteriorEmployees"} component={Section} component2={EmpPreview}/>}
      </div>
    </div>
    </div>
    )}

export default EmpScreen