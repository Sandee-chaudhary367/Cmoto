import React, {useState} from 'react'
import { connect } from 'react-redux';
import './section.css'
import firebase from '../../firebase/firebase.utils.js'
import { storage } from "../../firebase/firebase.utils.js"
import { closePopup } from '../../redux/popup/popup.action';
import { openform } from '../../redux/popup/popup.action';

const Section=({openForm,closepopup,popup,address,component2:Component2,area,societies})=>{
  const [carInAr,setCarInAr]=useState("");
  let [formData,setFormData]=useState({});
  const [photo,setPhoto] = useState(null);


function getTodayDate() {
  var todayUs = new Date()
  var offset = '+5.5' // since database belongs to US
  var utc = todayUs.getTime() + todayUs.getTimezoneOffset() * 60000 // therefore converting time to IST
  var today = new Date(utc + 3600000 * offset)
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()

  today = yyyy + '-' + mm + '-' + dd
  return today
}

// const BringDate=(color)=>{
//   let date=getTodayDate();
//   return date;
// }

    const carInArea=(num)=>{
      setCarInAr(num);
    }
  
    const closepop=()=>{
      if(popup.form===4){
        return;
      }
      closepopup();
      setPhoto(null);
      setFormData(null);
    }

    const openF=(e)=>{
      if(e===4){
        openForm(4);
        return;
      }
      if(e==5){
        openForm(5);
        return;
      }
      openForm(e.target.id)
      setFormData({Carnum:popup.CarNums,Area:popup.Area,Society:popup.Society,date:getTodayDate()});
      setPhoto(null);
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]:value.trim()
      });
    };

    function handlePhoto(e) {
      setPhoto(e.target.files[0]);
    }

    const SubmitPhoto=async(e)=>{
      try{
        if(photo){
          openF(4);
          let SubmitTime=new Date();
          let Year=SubmitTime.getFullYear();
          let Month=SubmitTime.getMonth()+1;
          let hour=SubmitTime.getHours();
          let min=SubmitTime.getMinutes();
          let sec=SubmitTime.getSeconds();

          // console.log(`cars/${Year}/${Month}/${formData.Area}/${formData.Society}/${getTodayDate()}/${formData.Carnum}/${hour}-${min})`)
          // console.log(photo);
        
          await storage.ref(`cars/${Year}/${Month}/${formData.Area}/${formData.Society}/${getTodayDate()}/${formData.Carnum}/${hour}-${min}-${sec}`).put(photo);
          let bb= await storage.ref(`cars/${Year}/${Month}/${formData.Area}/${formData.Society}/${getTodayDate()}/${formData.Carnum}`).child(`${hour}-${min}-${sec}`).getDownloadURL()

          const WorkHistory={"Photo Url":bb,doneBy:"alter"}
          let Ref=firebase.database().ref(`Car Status/${formData.Carnum}/Work History/${formData.date}`);
          Ref.update(WorkHistory)  
          if(formData.date===getTodayDate()){
          let Ref2=firebase.database().ref(`Car Status/${formData.Carnum}`);
          Ref2.update({status:"cleaned"}) ;
          }
          alert("successfully added")
          openF(5);
          closepop();

        }else{
          alert("Please fill the required field");
        }
      }catch(e){
        console.log(e);
        alert("failed")
      }
     
    }

    const HandleSubmit=async(e)=>{
      try{
        if(formData.PhotoLink){
          // console.log(formData)
            const WorkHistory={"Photo Url":formData.PhotoLink,doneBy:"alter"}
            let Ref=firebase.database().ref(`Car Status/${formData.Carnum}/Work History/${formData.date}`);
            Ref.update(WorkHistory)  
            if(formData.date===getTodayDate()){
            let Ref2=firebase.database().ref(`Car Status/${formData.Carnum}`);
            Ref2.update({status:"cleaned"}) ;
            }
            alert("successfully added")
            closepop();
        }else if(formData.reason){
          const missedCar={"reason":formData.reason}
          let Ref=firebase.database().ref(`Car Status/${formData.Carnum}/Missed car History/${formData.date}`)
          Ref.update(missedCar)  
          alert("successfully added")
          closepop();
        }else{
          alert("Please fill the required field");
        }
      }catch(e){
        console.log(e);
        alert("failed")
      }
     
    }

    
    return(
    <div>
    {popup.popupIsOpen && < div onClick={closepop} style={{position:"fixed",top:"0%",left:"0%",background:"#000000f0",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
    </div>
  }

    { popup.popupIsOpen && popup.form==1 && <div style={{position:"fixed",top:"38%",left:"30%",width:"40%",minWidth:"200px"}}>
    <h1 style={{textAlign:"center",background:`${popup.Color}`===""?"white":`${popup.Color}`,color:"black"}}>{popup.CarNums}</h1>    <ul className="list-group">
    <li id="2" onClick={openF}  style={{cursor:"pointer"}} className="list-group-item">Not Cleaned</li>
    <li id="3" onClick={openF} style={{cursor:"pointer"}} className="list-group-item">Cleaned</li>
    </ul>
    </div>
    }

    { popup.popupIsOpen && popup.form==2 && <div style={{position:"fixed",top:"25%",left:"30%",width:"40%",minWidth:"200px"}}>
    <h1 style={{textAlign:"center",background:`${popup.Color}`===""?"white":`${popup.Color}`,color:"black"}}>{popup.CarNums}</h1>
    <form id="my-form"> 
    <div className="card w-100">
    <div className="card-body">
    <div  className="form-group-sm mb-3">
    <label >Reason why car is not cleaned :</label>
    <textarea style={{height:"200px"}} className="form-control"  onChange={handleChange} type="text" name="reason" required  placeholder="Enter a reason"/>
    <br/>
    <button onClick={HandleSubmit} class="btn btn-secondary bg-primary" type="button">Upload</button>
    </div>
    </div>
    </div>
    </form>
    </div>
    }
    
    { popup.popupIsOpen && popup.form==3 &&  <div style={{position:"fixed",top:"20%",left:"30%",width:"40%",minWidth:"200px"}}>
    <h1 style={{textAlign:"center",background:`${popup.Color}`===""?"white":`${popup.Color}`,color:"black"}}>{popup.CarNums}</h1>    
    <div style={{minWidth:"300px"}} className="card w-100">
    <div className="card-body">
        <form>
        <div  className="form-group-sm mb-3">
          <label >Photo Link</label>
          <input type="text" className="form-control"  onChange={handleChange} name="PhotoLink" placeholder="Photo link"/>
          <br/>
          <button onClick={HandleSubmit} class="btn btn-secondary bg-primary" type="button">Upload</button>
        </div>
        </form>
       
      
        <h2 style={{textAlign:"center"}}>OR</h2>

        <form>
        <div className="form-group-sm mb-3">
          <label >Photo</label><br/>
          <input type="file" name="Photo" onChange={handlePhoto} className="custom-file-input" name="Photo"/>
          <br/>
          <button onClick={SubmitPhoto} class="btn btn-secondary bg-primary" type="button">Upload</button>
          </div>
          </form>
        </div>

        
    </div>

    </div>
    }

    {
      popup.popupIsOpen && popup.form==4 && <div style={{position:"fixed",top:"45%",left:"45%",width:"40%",minWidth:"200px"}}>
      <h1 style={{color:"white"}}>Loading...</h1>
      </div>  
    }


    <div className="Section mb-4">
    <div className="d-flex justify-content-start" style={{borderBottom:"solid 2px"}}>
    <h1 className="heading mb-2" style={{fontSize:20,color:'black',fontWeight:"700"}}>{area} {carInAr?`(${carInAr})`:null}</h1>
    </div>
    <div className="mt-1">
    <Component2 area={area} address={address} carInArea={carInArea} societies={societies}/>   
    </div>
    </div>
    </div>
    )

}


const mapStateToProps=state=>(
  {popup:state.popup}
)

const mapDispatchToProps = (dispatch) => {
  return {
    closepopup: () => {
      dispatch(closePopup())
    },
    openForm:(formNo)=>{
      dispatch(openform(formNo))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Section);


