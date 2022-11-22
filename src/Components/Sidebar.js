import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav
      className=' navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white'
      id='sidenav-main'
    >
      <div className='scrollbar-inner'>
        {/* <!-- Brand --> */}
        <div className='sidenav-header  align-items-center'>
          <Link className='navbar-brand' to='/'>
            <img
              src='assets/img/brand/blue.png'
              className='navbar-brand-img'
              alt='...'
            />
          </Link>
        </div>
        <div className='navbar-inner'>
          {/* <!-- Collapse --> */}
          <div className='collapse navbar-collapse' id='sidenav-collapse-main'>
            {/* <!-- Nav items --> */}
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link
                  className={
                    window.location.pathname === '/'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  to='/'
                >
                  <i className='fas fa-car '></i>
                  <span className='nav-link-text'>Cars</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    window.location.pathname === '/exlive'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  to='/exlive'
                >
                  <i className='ni ni-planet text-orange'></i>
                  <span className='nav-link-text'>Exterior Live</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    window.location.pathname === '/inlive'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  to='/inlive'
                >
                  <i className='ni ni-planet text-primary'></i>
                  <span className='nav-link-text'>Interior Live</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    window.location.pathname === '/payment'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  to='/payment'
                >
                  <i className='ni ni-single-02 text-yellow'></i>
                  <span className='nav-link-text'>Payment</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    window.location.pathname === '/employee'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  to='/employee'
                >
                  <i className='ni ni-bullet-list-67 text-default'></i>
                  <span className='nav-link-text'>Employee</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    window.location.pathname === '/setDuties'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  to='/setDuties'
                >
                  <i className='ni ni-key-25 text-info'></i>
                  <span className='nav-link-text'>Set Duties</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    window.location.pathname === '/addAddress'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  to='/addAddress'
                >
                  <i className='fas fa-plus'></i>
                  <span className='nav-link-text'>Add</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
