import React ,{useEffect,useState}from "react";
import { auth,storage } from "../../firebase/firebase.utils.js"
import { useHistory } from "react-router-dom";
import firebase from '../../firebase/firebase.utils.js'
import {Prompt} from 'react-router-dom'
import validate from "../../utils/validation.js"
import '../Loader.css'
import Loader from "../Loader.js";

const EmployeeForm=()=>{
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const  [mess, setMess] = React.useState("");
  const  [loading, setLoading] = React.useState(false);
  const [formData_1, updateFormData_1] = useState({});
  const [formData_2, updateFormData_2] = useState({});
  const [uidGenerated,setUidGenerated]=useState(false);
  const [employeeUid,setEmployeeUid]=useState("")
  const [societies, setSocieties] = useState([])
  const [areas, setAreas] = useState([])
  const [Employee, setEmployee] = useState([])
  const [EmployeeUID, setEmployeeUID] = useState([])
  const[done,setDone]=useState(false);
  const [aadhaar, setAadhaar] = useState(null);
  const [photo, setPhoto] = useState(null);

  function handleAadhaar(e) {
    setAadhaar(e.target.files[0]);
  }

  function handlePhoto(e) {
    setPhoto(e.target.files[0]);
  }

    let history = useHistory();

    useEffect(() => {
      firebase.database().ref("address").on(
          'value',
          (snapshot) => {
            const a = []
            snapshot.forEach((element) => {
              if (element.key !== 'clusters') {
                a.push(element.key)
              }
            })
            setAreas(a)
          },
          (err) => {
            console.log(err)
          }
        )

        firebase.database().ref(`Employee`).on('value',(snapshot) => {
                const a = []
                const b=[]
                snapshot.forEach((element) => {           
                    a.push(element.key) 
                    b.push(element.val())
                })
                setEmployeeUID(a)
                setEmployee(b);
              },
              (err) =>{
                    console.log(err)
              })

        window.addEventListener('beforeunload', alertUser)
        return () => {
          window.removeEventListener('beforeunload', alertUser)
        }
    }, [])
  
    const alertUser = e => {
      e.preventDefault()
      e.returnValue = ''
    }

    const handleBlur = evt => {
      const { name, value } = evt.target;
      const { [name]: removedError, ...rest } = errors;
      const error = validate[name](value);

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

    const handleChange_1 = (e) => {
      setMess("");
        updateFormData_1({
          ...formData_1,
          [e.target.name]: e.target.value.trim()
        });
    };

    const handleChange_2 = (e) => {
        setMess("");
        
        updateFormData_2({
          ...formData_2,
          [e.target.name]: e.target.value.trim()
        });
    };
      
    const handleSubmit_1 = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
          if(formData_1.password!==formData_1.Conpassword){
            setLoading(false)
            alert("password and confirm password do not match")
            return;
          }
          const { user } = await auth.createUserWithEmailAndPassword(formData_1.email,formData_1.password);
         setEmployeeUid(user.uid);
         setUidGenerated(true);
         setValues();
         setErrors({})
         setTouched({});
         setLoading(false);
        } catch (error) {
          setLoading(false);
          setErrors({})
          setTouched({});
          setMess(error.message)
        }
    }


    function now() {
      var tempDate = new Date();
      var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
      return date
    }

    const handleSubmit_2 = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
          if(formData_1.Type==="Interior" && formData_2.ee1===formData_2.ee2){
            setLoading(false)
            alert('Employee 1 and 2 cannot be same');
            return;
          }
         setDone(true);
          let {Area,Society,ee1,ee2,...Employee}=formData_2;
        
          
          await storage.ref(`${formData_1.Type}employee/${Area}/${Society}/${Employee.Name}${now()}/AadharPhoto-${now()}`).put(aadhaar);
          let bb= await storage.ref(`${formData_1.Type}employee/${Area}/${Society}/${Employee.Name}${now()}`).child(`AadharPhoto-${now()}`).getDownloadURL()
        
          await storage.ref(`${formData_1.Type}employee/${Area}/${Society}/${Employee.Name}${now()}/EmployeePhoto-${now()}`).put(photo);
          let aa= await storage.ref(`${formData_1.Type}employee/${Area}/${Society}/${Employee.Name}${now()}`).child(`EmployeePhoto-${now()}`).getDownloadURL()
       
          let EmployeeData_1={...Employee,password:formData_1.password,email:formData_1.email,name:Employee.Name,mobileNo:Employee.ContactNumber,Cluster:"",ClusterNumber:"",status:"free",todaysCars:"",Working_Address:`${Area}/${Society}`,"working on": "",aadhaar:`${bb}`,photo:`${aa}`}
          if(formData_1.Type==="Interior"){
            EmployeeData_1={...EmployeeData_1,linkedWith:`${formData_2.ee1},${formData_2.ee2}`,mondayCars:``,tuesdayCars:``,wednesdayCars:``,thursdayCars:``,fridayCars:``}
          }
          let userRef= firebase.database().ref(`${formData_1.Type}Employee/${employeeUid}`);
          userRef.update(EmployeeData_1);
          let EmployeeData_2={Cluster:"",Name:Employee.Name,email:`${formData_1.email}`,ClusterNumber:"",status:"free",todaysCars:"",Working_Address:`${Area}/${Society}`,"working on":""}
          if(formData_1.Type==="Interior"){
            EmployeeData_2={...EmployeeData_2,linkedWith:`${formData_2.ee1},${formData_2.ee2}`,mondayCars:``,tuesdayCars:``,wednesdayCars:``,thursdayCars:``,fridayCars:``}
          }
          let userRef2= firebase.database().ref(`${formData_1.Type}Employees/${Area}/${Society}/${employeeUid}`);
          userRef2.update(EmployeeData_2);
          setLoading(false)
          alert("successFully Added")
          history.push("/employee")
        } catch (error) {
          setLoading(false)
          setErrors({})
          setTouched({});
          console.log(error.message)
          setMess(error.message)
        }
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
        },
        (err) => {
          console.log(err)
        }
        )
    }


    return(
      <>
      {loading ? <Loader/> :
      <div>
      
      {uidGenerated ?  
      <div>
          <Prompt
          when={!done}
          message={ `Changes you made may not be saved.`}
          />

          {mess &&
            <div className="alert alert-danger mt-3" role="alert">
            Add new Employee operation failed!
            <br></br>
            Reason : {mess}
            </div>}

          <div className="card">
          <div className="card-header">
            <h2>Employee Uid: {employeeUid}</h2>
          </div>
            <div className="card-body">
            <blockquote className="blockquote mb-0">
    
            <form onSubmit={handleSubmit_2} > 

              <div className="form-group-sm mb-3 mb-3">
              <label>Name</label>
              <input  class="form-control"   name="Name" required onBlur={handleBlur} onChange={(e)=>{handleValid(e); handleChange_2(e)}} placeholder="Enter name"/>
              <small style={{color:"red"}}>{touched.Name && errors.Name}</small>

              </div>


              <div className="form-group-sm mb-3 mb-3">
                <label>Employee Address</label>
                <input  class="form-control"   name="Address" required onChange={handleChange_2} placeholder="Enter Address"/>
                </div>

              <div className="form-group-sm mb-3 mb-3">
                <label>Mobile Number</label>
                <input  class="form-control"  name="ContactNumber" required onBlur={handleBlur} onChange={(e)=>{handleValid(e); handleChange_2(e)}} placeholder="Enter Mobile Number"/>
                <small style={{color:"red"}}>{touched.ContactNumber && errors.ContactNumber}</small>
              </div>
              
              <div className="form-group-sm mb-3">
              <label>Area</label>
              <select className="custom-select" required name="Area" onChange={(e)=>{handleChange_2(e);society(e)}}>
              <option disabled selected value="">Choose...</option>
               {
                    areas.map((area,i)=>{
                      return (
                      <option >{area}</option>
                    )})
                }   
              </select>
              </div>

              <div className="form-group-sm mb-3">
              <label>Society</label>
              <select className="custom-select" required name="Society" onChange={handleChange_2}>
              <option selected value="">Choose...</option>
                   {  
                      societies.map((society,i)=>{
                        return (
                        <option>{society}</option>
                      )})
                   }
            </select>
            </div>

            { formData_1.Type==="Interior" && 
          
             <div>
             <div className="form-group-sm mb-3">
             <label>Exterior Employee 1</label>
             <select className="custom-select" required name="ee1"  onChange={handleChange_2}>
             <option selected value="">Choose...</option>
               {
                Employee.map((ele,i)=>{
                  return (
                  <option value={EmployeeUID[i]}>{ele.Name} - ({ele.Working_Address})</option>
                )})
               }   
             </select>
             </div>

             <div className="form-group-sm mb-3">
             <label>Exterior Employee 2</label>
             <select className="custom-select" required name="ee2" onChange={handleChange_2}>
                 <option selected value="">Choose...</option>
                 {
                     Employee.map((ele,i)=>{
                       return (
                       <option value={EmployeeUID[i]}>{ele.Name} - ({ele.Working_Address})</option>
                     )})
                 }
              </select>
              </div>

             </div>
            }

            <div class="form-group-sm mb-3 ">
            <label >Aadhaar</label>
            <input type="file" name="aadhaar" onChange={handleAadhaar} required class="form-control-file" />
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
          </div>

          :

          <div>
            <Prompt
            when={!done}
            message={ `Changes you made may not be saved.`}
            />
            <div className="card">
          
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                    
                    {mess &&
                      <div className="alert alert-danger mt-3" role="alert">
                      Add new Employee operation failed!
                      <br></br>
                      Reason : {mess}
                      </div>}

                    <form onSubmit={handleSubmit_1} > 
        
                  <div className="form-group-sm mb-3">
                  <label>Employee Type</label>
                  <select className="custom-select" required name="Type" onChange={handleChange_1}>
                        <option disabled selected value="">Choose...</option>
                        <option value="">Exterior</option>
                        <option>Interior</option>
                  </select>
                  </div>

                  <div className="form-group-sm mb-3">
                    <label>Email</label>
                    <input  class="form-control" name="email" required onBlur={handleBlur} onChange={(e)=>{handleValid(e); handleChange_1(e)}} placeholder="Enter email"/>
                    <small style={{color:"red"}}>{touched.email && errors.email}</small>
                    </div>

                    <div className="form-group-sm mb-3 mb-3">
                    <label>Password</label>
                    <input  class="form-control"  type="password" name="password" required onChange={handleChange_1} placeholder="Enter password"/>
                    </div>

                    <div className="form-group-sm mb-3 mb-3">
                    <label>Confirm Password</label>
                    <input  class="form-control"  name="Conpassword" required onChange={handleChange_1} placeholder="Enter password to confirm"/>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                  
                    
                    </blockquote>
                </div>
            </div>
            </div>
      }

      </div>  
} 
      </>  
    )
}

export default EmployeeForm;