import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import './exlive-items.styles.css'
import firebase from '../../../../firebase/firebase.utils.js'
import { connect } from 'react-redux';
import { openPopup } from '../../../../redux/popup/popup.action';
import ExtraItem from './extra-items';
import React,{ useEffect, useState } from 'react'

// a.map((element)=><h4>{element}</h4>)
const ExliveItem=({openpopup,Employees,address})=>{
   const EmployeesName=Object.keys(Employees)
   const Employeedetails=Object.values(Employees)
   
//    const [cn,setCn]=useState({});
   const [map,setMap] = useState({})

  
useEffect(()=>{
    reload()
  },[]);

  const reload = () => {
    firebase.database().ref('Car Status').on('value',(snapshot)=>{
      setMap(snapshot.val())
    })
  }


   
const gg =function (carnums){

    if(!carnums){
       return [];
    }
   carnums=carnums.split(",")
   return carnums;
}

const gl =function (carnums){
    if(!carnums){
       return 0;
    }
    let a=0;
   for(let i=0;i<carnums.length;i++){
        if(carnums[i]===","){
            a=a+1;
        }
   }
   return a+1;
}

function getLastWorkDate() {
    var todayUs = new Date()
    const lastWorkUs = new Date(todayUs)
    
    lastWorkUs.setDate(lastWorkUs.getDate() - 1)
    if(lastWorkUs.getDay()===0){
        lastWorkUs.setDate(lastWorkUs.getDate() - 1)
    }
    var offset = '+5.5' // since database belongs to US
    var utc = lastWorkUs.getTime() +lastWorkUs.getTimezoneOffset() * 60000 // therefore converting time to IST
    var lastWork = new Date(utc + 3600000 * offset)
    var dd = String( lastWork.getDate()).padStart(2, '0')
    var mm = String( lastWork.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy =  lastWork.getFullYear()
  
    lastWork = yyyy + '-' + mm + '-' + dd
    return  lastWork
}


// let rr={};
let yes=0;
let no=0;


const col=function(el){
    let co=""
    firebase.database().ref(`Car Status/${el}/status`).on('value',(snapshot) => {
       if(snapshot.val()==="cleaned"){
        firebase.database().ref(`Car Status/${el}/Work History`).on('value',(snapshot) => {
            if(snapshot.val()){
                co=snapshot.val()[getTodayDate()]?snapshot.val()[getTodayDate()].doneBy==="alter"?"orange":"lightgreen":""
            }
        })  
           yes=yes+1;
       }else if(snapshot.val()==="scanned"){
           co="yellow"
           no=no+1;
       }else if(snapshot.val()==="In waiting"){
            firebase.database().ref(`Car Status/${el}/Work History`).on('value',(snapshot) => {
                if(snapshot.val()){
                    co=snapshot.val()[getLastWorkDate()]?"":"red"
                }
            })
           no=no+1;
       }
    })
    return co;
}




const link=function(el){
    let co=""
    if(el===null) return
    firebase.database().ref(`Car Status/${el}/`).on('value',(snapshot) => {
        if(snapshot.val()===null) return;
        co = snapshot.val()['Work History'] ? snapshot.val()['Work History'][getTodayDate()] ? snapshot.val()['Work History'][getTodayDate()]['Photo Url'] : "" : ""
    })
    // console.log("ink  -"+co);
    return co
}

// const cll=(yes,no,i)=>{
//     rr={...rr,[`Em${i}`]:[yes,no]}
//     console.log(cn)
// }

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
    
  const countClusterLength=(a)=>{
    if(a===""){
        return 0;
    }
    return a.split(",").length;
  }

  const clean_Unclean=(e)=>{
     let arr=e.target.id.split("/");
        let carnum=arr[2];
     if(e.target.style.backgroundColor==="lightgreen" || e.target.style.backgroundColor==="orange"){
        const url = link(carnum);
        window.open(url, '_blank');
     }else if(e.target.style.backgroundColor==="yellow"){
        return;
     }else{
        const detailsOfclickedCar={CarNums:carnum,Area:arr[0],Society:arr[1],Color:e.target.style.backgroundColor}
        openpopup(detailsOfclickedCar)
     }
    
  }

    return(
        <>
        
            <Table bordered responsive style={{marginBottom:0}}>
            <thead >
            {EmployeesName.map((Name,i)=>(
                    <td style={{textAlign:"center",fontSize:14,fontWeight:600,color:"black"}} ><div style={{listStyleType:'none'}}>
                        <h2><Link to={`/empinfo?uid=${Name}&address=Employees`}>{Employeedetails[i].Name}</Link> ({countClusterLength(Employeedetails[i].Cluster)})</h2>
                        {/* <h5><span style={{fontWeight:'bold',fontSize:'18px',color:'green'}}>{cn?cn[`Em${i}`]?cn[`Em${i}`][0]:null:null}</span> & <span style={{fontWeight:'bold',fontSize:'18px',color:'red'}} >{cn?cn[`Em${i}`]?cn[`Em${i}`][1]:null:null}</span></h5> */}
                        </div></td>
            ))} 
        </thead>
        <tbody >
            {
               Employeedetails.map((ele,i)=>(
                   <td style={{padding:0}}>
                    <div style={{display:'none'}}>{yes=0}
                    {no=0}</div>
                    {
                     gg(ele.Cluster).map((el,j)=>(
                        <h3 id={`${ele.Working_Address}/${el}`} onClick={clean_Unclean} style={{cursor:"pointer",textAlign:"center",marginBottom:0.75,padding:15,fontSize:14,color:"black",backgroundColor:col(el)}}>{el}</h3>  
                    ))
                    }
                    <div  className="d-flex bd-highlight"> <h3 className="p-2 flex-fill bd-highlight" style={{textAlign:"center",borderTop:"2px solid black",borderBottom:"2px solid black",marginBottom:0.75,padding:20,fontSize:14,color:"lightgreen"}}>{yes}</h3><h3 className="p-2 flex-fill bd-highlight" style={{textAlign:"center",borderTop:"2px solid black",borderBottom:"2px solid black",marginBottom:0.75,padding:20,fontSize:14,color:"red"}}>{no}</h3></div>
                    {

                        <>
                           <div >
                            <h2 style={{textAlign:"center",fontSize:19,fontWeight:600,background:"black",marginTop:"5px",padding:"10px",color:"white"}}>Extra Car</h2>
                           </div> 
                           
                           <ExtraItem EmployeesDetails={ele}/>
                        
                        </>
                    }
                    </td>
               ))
                
            } 
            
           
        </tbody>
        
            </Table>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      openpopup: (carnum) => {
        dispatch(openPopup(carnum))
      }
    }
  }
  
  export default connect(null,mapDispatchToProps)(ExliveItem);