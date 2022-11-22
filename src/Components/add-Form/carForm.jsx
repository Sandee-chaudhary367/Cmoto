import React,{useEffect,useState}from "react";
import { useHistory } from "react-router-dom";
import firebase from '../../firebase/firebase.utils.js'
import {Prompt} from 'react-router-dom'
import { storage } from "../../firebase/firebase.utils.js"
import validate from "../../utils/validation.js"
import Loader from '../Loader'

const CarForm=()=>{

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [loading, setLoading] = React.useState(false);
     
    const [societies, setSocieties] = useState([])
    const [areas, setAreas] = useState([])
    const [formData, updateFormData] = React.useState({});
    const[done,setDone]=useState(false);
    const [photo,setPhoto] = useState(null);
    let history = useHistory();

    useEffect(() => {
        firebase.database().ref("address").on('value',(snapshot) => {
              const a = []
              snapshot.forEach((element) => {           
                  a.push(element.key)    
              })
              setAreas(a)
        },
        (err) =>{
              console.log(err)
        })


        window.addEventListener('beforeunload', alertUser)
        return () => {
          window.removeEventListener('beforeunload', alertUser)
        }
    },[])

    function handlePhoto(e) {
      setPhoto(e.target.files[0]);
    }

    const alertUser = e => {
      e.preventDefault()
      e.returnValue = ''
    }

    const society=(event)=>{
        if(event.target.value==="Choose..."){
              return;
        }
        firebase.database().ref(`address/${event.target.value}`).on('value',(snapshot) => {
            const s = []
            snapshot.forEach((element) => {
              s.push(element.key)
            }) 
            setSocieties(s)   
        }
        ,
        (err) => {
            console.log(err)
        })
    }

    const handleBlur = evt => {
      const { name, value } = evt.target;
  
      // remove whatever error was there previously
      const { [name]: removedError, ...rest } = errors;
  
      // check for a new error
      const error = validate[name](value);
  
      // // validate the field if the value has been touched
      setErrors({
        ...rest,
        ...(error && { [name]: touched[name] && error }),
      });
    };

    const handleValid=(e)=>{
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
  
      setTouched({
        ...touched,
        [name]: true,
      });

    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      updateFormData({
        ...formData,
        [name]:value.trim()
      });
    };

    function now() {
      var tempDate = new Date();
      var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
      return date
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true)
        try {
          setDone(true);
          let {Area,Society,houseNumber,...carData}=formData;
          await storage.ref(`cars/${Area}/${Society}/${formData.number}/Photo-${now()}`).put(photo);
          let bb= await storage.ref(`cars/${Area}/${Society}/${formData.number}`).child(`Photo-${now()}`).getDownloadURL()

          let CarStatus={category:formData.category,Active:1,newlyadded:true,Working_Address:`${formData.Area}/${formData.Society}`,lastCleanedInterior:`${now()}`,lastPaidOn:`${now()}`,"Interior Cleaning status":"In waiting",status: "In waiting",InteriorDays_Left:4,doneBy:"",timeStamp: "0"}
          let cars= {...carData,Active:1,newlyadded:true,houseNumber:parseInt(houseNumber),address:`${houseNumber} ${formData.Area}/${formData.Society}`,photo:`${bb}`}
          let userRef=firebase.database().ref(`cars/${Area}/${Society}/${formData.number}`);
          userRef.update(cars)
          let userRef2=firebase.database().ref(`Car Status/${formData.number}`);
          userRef2.update(CarStatus)
          alert("successfully added")
          setLoading(false)
          history.push("/") 
        } catch (error) {
          console.log(error)
        }
    }

    return(
      <>
      
      <div>
        <Prompt
        when={!done}
        message={ `Changes you made may not be saved.`}
        />
       {loading ? <Loader/> :
        <div className="card">
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                
                <form onSubmit={handleSubmit} > 
                
                <div className="form-group-sm mb-3">
                <label>Area</label>
                <select className="custom-select"  required name="Area" onInput={society} onChange={handleChange}>
                  <option disabled selected value="">Choose...</option>
                  {
                      areas.map((area,i)=>{
                        return (
                        <option>{area}</option>
                      )})
                  }
                  
                </select>
              </div>

              <div className="form-group-sm mb-3">
              <label>Society</label>
              <select className="custom-select"  required name="Society" onChange={handleChange}>
                <option disabled selected value="">Choose...</option>
                {
                    societies.map((society,i)=>{
                      return (
                      <option>{society}</option>
                    )})
                }
              </select>
            </div>

                <div className="form-group-sm mb-3">
                 <label>Vehicle No.</label>
                 <input  class="form-control" name="number" required  onBlur={handleBlur} onChange={(e)=>{handleValid(e); handleChange(e)}} placeholder="Enter vehicle number"/>
                 <small style={{color:"red"}}>{touched.number && errors.number}</small>
                 </div>
                
                <div className="form-group-sm mb-3">
                 <label >Owner Name</label>
                 <input  class="form-control" name="name" required onBlur={handleBlur} onChange={(e)=>{handleValid(e); handleChange(e)}} placeholder="Enter owner name "/>
                 <small style={{color:"red"}}>{touched.name && errors.name}</small>
                 </div>
                

                <div className="form-group-sm mb-3">
                <label >Mobile No.</label>
                <input  class="form-control" name="mobileNo" required onBlur={handleBlur} onChange={(e)=>{handleValid(e); handleChange(e)}} placeholder="Enter mobile number"/>
                <small style={{color:"red"}}>{touched.mobileNo && errors.mobileNo}</small>
                </div>

                <div className="form-group-sm mb-3">
                <label >House Number</label>
                <input type="number" class="form-control" name="houseNumber" required onChange={handleChange} placeholder="Enter house number"/>
               </div>

                <div className="form-group-sm mb-3">
                 <label >Category</label>
                 <select className="custom-select" required onChange={handleChange} name="category">
                <option disabled selected value="">Choose...</option>
                  <option >HatchBack</option>
                  <option >Sedan/LUV</option>
                  <option >SUV</option>
                  <option >Bike/Scooty</option>
                </select>
                </div>

                <div className="form-group-sm mb-3">
                 <label >Model</label>
                 <input className="form-control" name="model" required onChange={handleChange} placeholder="Enter model"/>
                </div>

                <div className="form-group-sm mb-3 mb-3">
                <label>Leave Time</label>
                <select className="custom-select" required onChange={handleChange} name="leaveTime">
                <option disabled selected value="">Choose...</option>
                  <option >Early</option>
                  <option >Late</option>
                </select>
                </div>

                <div class="form-group-sm mb-3 ">
                <label >Photo</label>
                <input type="file" name="Photo" onChange={handlePhoto} required class="form-control-file" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                
                </blockquote>
            </div>
        </div>

         }
        </div>
        
        </>
    )
}

export default CarForm;