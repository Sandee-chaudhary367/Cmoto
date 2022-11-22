import React ,{useEffect,useState}from "react";
import firebase from '../../firebase/firebase.utils.js'



const AddressForm=()=>{
    
    const [areas, setAreas] = useState([])
    const [formData_1, updateFormData_1] = useState({});
    
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
    },[])

    const handleChange_1=(e)=>{
        updateFormData_1({
            ...formData_1,
            [e.target.name]: e.target.value.trim()
          });
    }

    const onclick_1=()=>{
        try{
        let a=formData_1.newArea;
        let userRef=firebase.database().ref(`address/${a}`);
        userRef.set(`${now()}`) 
        alert(`${a} added successfully`)}
        catch(error){
            alert(`Operation Failed !! - ${error.message}`)  
        }
    }


    const onclick_2=(e)=>{
        try{
        e.preventDefault()
        let a=formData_1.Area;
        let b=formData_1.newSociety;
        let userRef=firebase.database().ref(`address/${a}/${b}`);
        userRef.set(`${now()}`)
        alert(`${b} added in ${a}`)
        }catch(error){
            alert(`Operation Failed !! - ${error.message}`)  
        }
    }

    function now() {
        var todayUs = new Date()
        var offset = '+5.5' // since database belongs to US
        var utc = todayUs.getTime() + todayUs.getTimezoneOffset() * 60000 // therefore converting time to IST
        var today = new Date(utc + 3600000 * offset)
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        var yyyy = today.getFullYear()
    
        today = yyyy + '-' + mm + '-' + dd
        return today.toString()
        // return '2021-05-05'
      }

    return(
        <div>
            <div className="card">
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                
                <label class="mb-3">Add a new Area</label>
                <div class="input-group mb-3">
                <input type="text" class="form-control" required placeholder="Add Area"  onChange={handleChange_1} name="newArea"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" onClick={onclick_1} type="button">Add</button>
                </div>
                </div>
                
            </blockquote>
            </div>
            </div> 

            <div className="card">
            <div className="card-body">
            <blockquote className="blockquote mb-0">

                <form onSubmit={onclick_2}>
                <label class="mb-3">Add a new Society</label>
                    <select className="custom-select mb-2" required  onChange={handleChange_1} name="Area">
                    <option disabled selected value="">Choose...</option>
                    {
                        areas.map((area,i)=>{
                        return (
                        <option>{area}</option>
                        )})
                    }
                </select>
                <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Add Society" required onChange={handleChange_1} name="newSociety"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">Add</button>
                </div>
                </div>
                </form>
                </blockquote>
            </div>
            </div> 
        </div>
    )
}

export default AddressForm