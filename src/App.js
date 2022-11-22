import HomeScreen from './Screens/HomeScreen'
import Login from './Screens/LoginScreen'
import { BrowserRouter } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import InfoScreen from './Screens/InfoScreen.js'
import Exlive from './Screens/ExliveScreen.js'
import Inlive from './Screens/InliveScreen.js'
import SignUp from './Screens/SignUp.js'
import { auth } from './firebase/firebase.utils.js'

import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions.js'
import PrivateRoutes from './Components/PrivateRoutes.js'
import PrivateRoutes2 from './Components/PrivateRoutes2.js'
import Loader from './Components/Loader'
import SetDuties from './Screens/SetDuties.js'
import EmployeeScreen from './Screens/EmployeeScreen.js'
import EmpInfoScreen from './Screens/EmpInfoScreen.js'
import CarEditScreen from './Screens/CarEditScreen'
import EmpEditScreen from './Screens/EmpEditScreen'
import AddCar from './Screens/AddCar'
import AddEmployee from './Screens/AddEmployee'
import AddAddress from './Screens/AddAddress'
import PaymentScreen from './Screens/PaymentScreen'


//Its render only on start and refresh for one time because of setloading
const App = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(true)
  //here is only one state loading so on change of this loading setstate it will render .

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const current = {
          id: userAuth.uid,
          email: userAuth.email,
        }
        setCurrentUser(current)
        setLoading(false)
      } else {
        setCurrentUser(userAuth)
        setLoading(false)
      }
    })
  }, [setCurrentUser])

   
  return (
    <BrowserRouter>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <PrivateRoutes exact path='/' component={HomeScreen} />
            <PrivateRoutes2 path='/login' component={Login} />
            <PrivateRoutes exact path='/carinfo' component={InfoScreen} />
            <PrivateRoutes exact path='/exlive' component={Exlive} />
            <PrivateRoutes exact path='/inlive' component={Inlive} />
            <PrivateRoutes exact path='/setDuties' component={SetDuties} />
            <PrivateRoutes exact path='/employee' component={EmployeeScreen} />
            <PrivateRoutes exact path='/empinfo' component={EmpInfoScreen} />
            <PrivateRoutes exact path='/empProfile' component={EmpEditScreen} />
            <PrivateRoutes exact path='/carprofile' component={CarEditScreen} />
            <PrivateRoutes exact path='/addemployee' component={AddEmployee} />
            <PrivateRoutes exact path='/addcar' component={AddCar} />
            <PrivateRoutes exact path='/addAddress' component={AddAddress} />
            <PrivateRoutes exact path='/payment' component={PaymentScreen} />
            <PrivateRoutes2 exact path='/signup' component={SignUp} />
          </div>
        )}
      </Fragment>
    </BrowserRouter>
  )
}

const mapDispatchToProps = (dispatch) => {
  return ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})}

export default connect(null, mapDispatchToProps)(App)
