import React, { useEffect, useState } from 'react'
import { auth } from "../firebase/firebase.utils.js"
import { Link,useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

const Navbar = ({listener,user}) => {
  const [searchString, setSearchString] = useState('')
  console.log(user);
  const history=useHistory();
  const submitHandler = (e) => {
    e.preventDefault()
    const a=window.find(searchString)
  }

  useEffect(()=>{
  },[])
  
  const logout=()=>{
    auth.signOut()
    history.push("/login")
  }

  return (
    <div className='main-content' id='panel'>
      <nav className='navbar navbar-top navbar-expand py-2 navbar-dark bg-dark border-bottom'>
          <div className='sidenav-toggler-dark'>
            <div className='p-3' onClick={listener}>
              <i className='sidenav-toggler-line'></i>
              <i className='sidenav-toggler-line'></i>
              <i className='sidenav-toggler-line'></i>
            </div>
          </div>
           {/* <!-- Search form --> */}
           <form
           className='navbar-search-light w-100 form-inline mr-sm-3'
           onSubmit={submitHandler}
           >
           <div className='form-group mb-0'>
             <div className='input-group input-group-alternative input-group-merge'>
               <div className='input-group-prepend'>
                 <span className='input-group-text'>
                   <i className='fas fa-search'></i>
                 </span>
               </div>
               <input style={{width:"300px"}}
                 className='form-control '
                 placeholder='Search'
                 type='text'
                 onChange={(e) => setSearchString(e.target.value)}
               />
             </div>
           </div>
         </form>

          <div className='navbar-collapse'>
            <ul className='navbar-nav align-items-center  ml-auto ml-md-0 '>
              <li className='nav-item dropdown'>
                <a
                  className='nav-link pr-0'
                  href='#'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <div className='media align-items-center pr-3'>
                    <span className='avatar avatar-sm rounded-circle'>
                      <img
                        alt='Image placeholder'
                        src='assets/img/theme/team-4.jpg'
                      />
                    </span>
                    <div className='media-body  ml-2 pr-4 d-none d-lg-block'>
                      <span className='mb-0 text-sm  font-weight-bold'>
                       {user}
                      </span>
                    </div>
                  </div>
                </a>
                <div className='dropdown-menu  dropdown-menu-right '>
                  <div className='dropdown-header noti-title'>
                    <h6 className='text-overflow m-0'>Welcome!</h6>
                  </div>
                  <a href='#!' className='dropdown-item'>
                    <i className='ni ni-single-02'></i>
                    <span>My profile</span>
                  </a>
                  <a href='#!' className='dropdown-item'>
                    <i className='ni ni-settings-gear-65'></i>
                    <span>Settings</span>
                  </a>
                  <a href='#!' className='dropdown-item'>
                    <i className='ni ni-calendar-grid-58'></i>
                    <span>Activity</span>
                  </a>
                  <a href='#!' className='dropdown-item'>
                    <i className='ni ni-support-16'></i>
                    <span>Support</span>
                  </a>
                  <div className='dropdown-divider'></div>
                  <Link to='/login' onClick={logout} className='dropdown-item'>
                    <i className='ni ni-user-run'></i>
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
      </nav>
    </div>
  )
}
const MapStateToProp=(state)=>{
  const {currentUser}=state.user
  return {user:currentUser.email}
}

export default connect(MapStateToProp,null)(Navbar)
