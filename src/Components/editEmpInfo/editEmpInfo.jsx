import React ,{useEffect,useState}from "react";
import firebase from '../../firebase/firebase.utils.js'
import './editEmpInfo.css'
import Loader from '../Loader'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'


const EditEmpInfo =({uid,addres})=>{
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [status, setStatus] = useState("");
    const [address, setAddress] = useState("");
    const [workAddress, setWorkAddress] = useState("");
    const history = useHistory()
    
    const set={setAddress,setStatus,setMobileNo,setName}
   
    const handleSubmit = async (event) => {
      event.preventDefault()
      try {
        let userRef = firebase.database().ref(`${addres}/${uid}`);
        userRef.update({ 
          Address: address,
          status: status,
          mobileNo: mobileNo,   
          ContactNumber: mobileNo,   
          Name: name,
          name:name
        });

        const a=workAddress.split('/');
        
        let userRef2=firebase.database().ref(`${addres}s/${a[0]}/${a[1]}/${uid}`);
        userRef2.update({
          Name:name,
          status:status
        })
       
        alert('successfully updated')
        history.push(`/empinfo?uid=${uid}&address=${addres}s`)
      } catch(error){
        alert(`Operation Failed !! - ${error.message}`)  
    }
    }

    const handleChange = (event) => {
      const { value, name } = event.target
      set[`${name}`](value);
    }

    const infofetch= function(){
         firebase
          .database()
          .ref(`${addres}/${uid}`)
          .on(
            'value',
            (snapshot) => {
             setName(snapshot.val().Name)
             setMobileNo(snapshot.val().ContactNumber)
             setAddress(snapshot.val().Address)
             setStatus(snapshot.val().status)
             setWorkAddress(snapshot.val().Working_Address)
             setLoading(false)
            },
            (err) => {
              console.log(err)
            }
          )
      }
    

    useEffect(() =>{
      infofetch() },[])

    

    return(
      
      <div>
      {loading ? <Loader/> :
        <div className="card">
          
       
          <div className="card-header heading" style={{color:'black'}}>
          <div className="d-flex justify-content-between">
          <h1>Edit Profile</h1>
          <button type="submit" form="my-form" class="btn btn-primary">Save</button>
          </div>
         </div>

          <div className="InfoContainer">
            <div className="card-body content">
              <blockquote className="blockquote mb-0">
              <form id='my-form'  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onSubmit={handleSubmit}>

              <div className="input-group mb-1 ">
                  <div className="input-group-prepend" style={{width:"18%"}}>
                    <span className="text-white bg-dark w-100  input-group-text border border-dark" >Employee Name</span>
                  </div>
                  <input type="text" onChange={handleChange} className="form-control  border border-dark" name="setName" value={name} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>

              <div className="input-group mb-1 ">
                  <div className="input-group-prepend" style={{width:"18%"}}>
                    <span className="text-white bg-dark w-100  input-group-text  border border-dark" >Phone</span>
                  </div>
                  <input type="text" onChange={handleChange} className="form-control  border border-dark" name="setMobileNo" value={mobileNo} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>

              <div className="input-group mb-1 ">
                  <div className="input-group-prepend" style={{width:"18%"}}>
                    <span className="text-white bg-dark w-100  input-group-text  border border-dark" >Status</span>
                  </div>
                  <input type="text" onChange={handleChange} className="form-control  border border-dark" name="setStatus" value={status} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>

              <div className="input-group mb-1 ">
                  <div className="input-group-prepend" style={{width:"18%"}}>
                    <span className="text-white bg-dark w-100 input-group-text border border-dark " >Address</span>
                  </div>
                  <input type="text" onChange={handleChange} className="form-control border border-dark" name="setAddress" value={address} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>  
               </form>


              </blockquote>
            </div>
           

          </div>
        </div>

      }
      </div>
   )
   
    
}

export default EditEmpInfo

