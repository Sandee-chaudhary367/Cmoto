import React ,{useEffect,useState}from "react";
import firebase from '../../firebase/firebase.utils.js'
import './empinfo.css'
import Loader from '../Loader'
import { Link} from 'react-router-dom'


const EmpInfo =({uid,address})=>{
    
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(true)
    console.log(address);
    const infofetch= function(){
    
         firebase
          .database()
          .ref(`${address}/${uid}`)
          .on(
            'value',
            (snapshot) => {
              let data=snapshot.val()
              if(address==="InteriorEmployee"){
             let partnerArr=snapshot.val().linkedWith.split(",");
             data.partnerArr=partnerArr}
             setEmployee(data) 
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
          
          <div class="d-flex justify-content-between">
            <h1>{employee.Name}</h1>
            
            <div>
            <Link  to={`empProfile?uid=${uid}&address=${address}`} style={{fontSize:14,marginBottom:0,textDecorationLine:"underline"}}>Edit</Link>
            </div>
            </div>
          </div>
          <div className="InfoContainer">
            <div className="card-body content">
              <blockquote className="blockquote mb-0">
           
              <h3>Employee Number :  <span className="details"> {employee.ContactNumber}</span> <a style={{color:"blue"}} href={`tel:${employee.ContactNumber}`}>(call)</a></h3>
              <h3>Status :  <span className="details"> {employee.status}</span></h3>
              <h3>Working Address :  <span className="details"> {employee.Working_Address}</span></h3>
              <h3>Address :  <span className="details">{employee.Address} </span></h3>
              <h3>email :  <span className="details">{employee.email} </span></h3>
              <h3>password : <span className="details">{employee.password} </span></h3>
              <h3>Aadhaar :  <a href={employee.aadhaar}  rel="noopener noreferrer"  target="_blank" style={{color:"blue"}}> click to open </a></h3>

              {address==="InteriorEmployee" &&  <h3>Partners : <a rel="noreferrer noopener" target="_blank" style={{color:"blue"}} href={`/empinfo?uid=${employee.partnerArr[0]}&address=Employees`}>Partner 1</a> , <a rel="noreferrer noopener" target="_blank"  style={{color:"blue"}} href={`/empinfo?uid=${employee.partnerArr[1]}&address=Employees`}>Partner 2</a></h3>}
              </blockquote>
            </div>
           
            <img className="Image ImageBox" style={{border:"double 5px"}} src={employee.photo} alt={`${employee.name}'s car`}/>
          </div>
        </div>

      }
      </div>
   )
   
    
}

export default EmpInfo

