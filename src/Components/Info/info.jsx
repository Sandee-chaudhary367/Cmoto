import React ,{useEffect,useState}from "react";
import firebase from '../../firebase/firebase.utils.js'
import './info.css'
import Loader from '../Loader'
import { Link} from 'react-router-dom'


const Info =({area,carnum})=>{
    const [vehicle, setVehicle] = useState({});
    const [loading, setLoading] = useState(true)
    

    const infofetch= function(){
         firebase
          .database()
          .ref(`cars/${area}/${carnum}`)
          .on(
            'value',
            (snapshot) => {
             setVehicle(snapshot.val())
             setLoading(false)
            },
            (err) => {
              console.log(err)
            }
          )
      }
    

    useEffect(() =>{
      infofetch() },[])

    const HandleActive=()=>{
      const aa=vehicle.Active?0:1
      firebase
          .database()
          .ref(`cars/${area}/${carnum}/Active`).set(aa);    
          
          firebase
          .database()
          .ref(`Car Status/${carnum}/Active`).set(aa); 
          
        setActiveCars(aa)
          
      
    }

    const setActiveCars = async (aa) => {
      var empId = ''
      var newCar = ''
      await firebase.database().ref(`Car Status/${carnum}/doneBy`).once('value',(snap)=>{
        if(snap.val()===null && snap.val().toString()!=='' && snap.val().toString()!==' '){

        }else{
          empId = snap.val().toString()
        }
      })
      await firebase.database().ref(`Employee/${empId}/Cluster`).once('value',(snapshot)=>{
        if(!snapshot.exists()) return
        if(aa===0)
        newCar = snapshot.val().toString().replace(carnum,'').split(',').filter(function (el) {
          return el != '';
        }).join(',')
        else 
        newCar = snapshot.val().toString() + "," + carnum
    })
    firebase.database().ref(`Employee/${empId}/Cluster`).set(newCar)
    firebase.database().ref(`Employees/${area}/${empId}/Cluster`).set(newCar)

    }

    return(
      
      <div>
      {loading ? <Loader/> :
        <div className="card">
        
         
          <div className="card-header heading" style={{color:'black'}}>
            <div class="d-flex justify-content-between">
            
            <h1>{vehicle.number}  <button type="button" style={{marginLeft:"10px",marginBottom:"2px"}} onClick={() => HandleActive()} className={`btn btn-sm btn-${vehicle.Active?"success":"danger"}`}>{vehicle.Active ? "Active":"Inactive"}</button></h1>
            <div>
            <Link  to={`carprofile?area=${area}&carnum=${carnum}`} style={{fontSize:14,marginBottom:0,textDecorationLine:"underline"}}>Edit</Link>
            </div>
            </div>
          </div>
         
          <div className="InfoContainer">
            <div className="card-body content">
              <blockquote className="blockquote mb-0">
              <h3>Owner Name :  <span className="details"> {vehicle.name}</span></h3>
              <h3>Owner Phone :  <span className="details"> {vehicle.mobileNo}</span> <a style={{color:"blue"}} href={`tel:${vehicle.mobileNo}`}>(call)</a></h3>
              <h3>Modal :  <span className="details"> {vehicle.model}</span></h3>
              <h3>Category :  <span className="details"> {vehicle.category}</span></h3>
              <h3>Address :  <span className="details">{vehicle.address} </span></h3>

              </blockquote>
            </div>
           
            <img className="Image ImageBox" style={{border:"double 5px"}} src={vehicle.photo} alt={`${vehicle.name}'s car`}/>
          
          </div>
        </div>

      }
      </div>
   )
   
    
}

export default Info

