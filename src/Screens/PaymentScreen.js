import React, { useState } from 'react'
import TodaysCollection from '../Components/TodaysCollection'
import PaymentReport from '../Components/PaymentReport'
import Navbar from '../Components/Navbar.js'
import Sidebar from '../Components/Sidebar'

const PaymentScreen = () => {
  let [a, setA] = useState(true)
  let [b, setB] = useState(true)
  const [sidebar,setSidebar] = useState(false)
  
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
        {/* <div
          className='d-flex justify-content-between'
          style={{ paddingTop: 25 }}
        >
          <button
            style={{
              paddingTop: '20',
              width: '33%',
              background: color(a),
              color: textcolor(a),
            }}
            // onClick={toggleA}
            className='container-fluid'
          >
            Today's Collection
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
            Payment Report
          </button>
        </div> */}
        <PaymentReport />

        {/* <div className='container-fluid' style={{ paddingTop: 25 }}>
          {a ? null : <TodaysCollection />}
          {b ? null : <PaymentReport />}
        </div> */}
      </div>
    </div>
  )
}

export default PaymentScreen
