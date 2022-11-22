import React ,{useEffect, useState}from "react";
import firebase from '../../firebase/firebase.utils.js'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import "./work-history.css"
const WorkHistory =({carnum})=>{
    const [value, onChange] = useState(new Date());

     const showImage=(value,e)=>{
        const date= `${value.getFullYear()}-${ String(value.getMonth()+1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
        let imageURL=null;
        firebase
      .database()
      .ref(`Car Status/${carnum}/Work History/${date}/Photo Url`)
      .on(
        'value',
        (snapshot) => {
           imageURL= snapshot.val();
        })
        if(imageURL){
         window.open(imageURL, '_blank', 'noopener,noreferrer')
        }
        
    // console.log(`Car Status/${carnum}/Work History/${date}/Photo Url`)
     }
    
    const dateColor=({ activeStartDate, date, view }) => {
      if(view!=="month"){
        return ;
      }
        const dat= `${date.getFullYear()}-${ String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        let img=0;
        firebase
      .database()
      .ref(`Car Status/${carnum}/Work History/${dat}/Photo Url`)
      .on(
        'value',
        (snapshot) => {
         
           img= snapshot.val();
           console.log("inside call = "+img)
        })

        console.log(img);
        return img?"clean":null
    }
    
    return (
     
   <div style={{margin:"10px 0 30px 0"}}>
    <Calendar 
    className="clean full"
    onClickDay={showImage}
    onChange={onChange}
    tileClassName={dateColor}

    value={value}
     />
     </div>
    )
}

export default WorkHistory;