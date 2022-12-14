import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase/firebase.utils.js'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
      setEmail('')
      setPassword('')
      setError({})
      history.push('/')
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    if (name === 'email') {
      setEmail(value)
    } else {
      setPassword(value)
    }
  }

  return (
    <div>
      {/* <!-- Navbar --> */}
      <nav
        id='navbar-main'
        className='navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light'
      >
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            <img src='../assets/img/brand/white.png' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbar-collapse'
            aria-controls='navbar-collapse'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='navbar-collapse navbar-custom-collapse collapse'
            id='navbar-collapse'
          >
            <div className='navbar-collapse-header'>
              <div className='row'>
                <div className='col-6 collapse-brand'>
                  <Link to='/'>
                    <img src='../assets/img/brand/blue.png' />
                  </Link>
                </div>
                <div className='col-6 collapse-close'>
                  <button
                    type='button'
                    className='navbar-toggler'
                    data-toggle='collapse'
                    data-target='#navbar-collapse'
                    aria-controls='navbar-collapse'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>

            <hr className='d-lg-none' />
          </div>
        </div>
      </nav>
      {/* <!-- Main content --> */}
      <div className='main-content'>
        {/* <!-- Header --> */}
        <div className='header bg-gradient-primary py-7 py-lg-8 pt-lg-9'>
          <div className='container'>
            <div className='header-body text-center mb-7'>
              <div className='row justify-content-center'>
                <div className='col-xl-5 col-lg-6 col-md-8 px-5'>
                  <h1 className='text-white'>Welcome to CMoto</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='separator separator-bottom separator-skew zindex-100'>
            <svg
              x='0'
              y='0'
              viewBox='0 0 2560 100'
              preserveAspectRatio='none'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <polygon
                className='fill-default'
                points='2560 0 2560 100 0 100'
              ></polygon>
            </svg>
          </div>
        </div>
        {/* <!-- Page content --> */}
        <div className='container mt--8 pb-5'>
          <div className='row justify-content-center'>
            <div className='col-lg-5 col-md-7'>
              <div className='card bg-secondary border-0 mb-0'>
                <div className='card-body px-lg-5 py-lg-5'>
                  <div className='text-center text-muted mb-4'>
                    <small>Sign in with credentials</small>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group mb-3'>
                      <div className='input-group input-group-merge input-group-alternative'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>
                            <i className='ni ni-email-83'></i>
                          </span>
                        </div>
                        <input
                          className='form-control form-input '
                          placeholder='Email'
                          onChange={handleChange}
                          name='email'
                          value={email}
                          type='email'
                          required
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='input-group input-group-merge input-group-alternative'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>
                            <i className='ni ni-lock-circle-open'></i>
                          </span>
                        </div>
                        <input
                          className='form-control form-input '
                          placeholder='Password'
                          name='password'
                          type='password'
                          value={password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='custom-control custom-control-alternative custom-checkbox'>
                      <input
                        className='custom-control-input'
                        id=' customCheckLogin'
                        type='checkbox'
                      />
                      <label
                        className='custom-control-label'
                        for=' customCheckLogin'
                      >
                        <span className='text-muted'>Remember me</span>
                      </label>
                    </div>
                    {error ? (
                      <p style={{ color: 'red' }}>{error.message}</p>
                    ) : null}

                    <div className='text-center'>
                      <button type='submit' className='btn btn-primary my-4'>
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col-6'>
                  <Link to='/' className='text-light'>
                    <small>Forgot password?</small>
                  </Link>
                </div>
                <div className='col-6 text-right'>
                  <Link to='/signup' className='text-light'>
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
