import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import firebase from '../../../../firebase/firebase.utils.js'
import './car-items.styles.css'



const CarItem=({vehicles,address,carInAppartment})=>{
   const carnums=Object.keys(vehicles)
   const cardetails=Object.values(vehicles)

   carInAppartment(carnums.length);

   const addnewAtriute=async(carnum)=>{
    let userRef2=await firebase.database().ref(`cars/${address}/${carnum}/newlyadded`);
    userRef2.set(false) 
   }

    return(
        
        <div>
        <Table bordered style={{marginBottom:0}} >
        <tbody>
        
        {carnums.map((carnum,i)=>{
            if(cardetails[i].newlyadded){  
            return(<tr key={carnum}>
            <td style={{textAlign:"center",padding:"5px 16px",background:"rgb(91, 103, 214)",fontWeight: "bolder"}}>  <Link   style={{fontSize:13,color:'black',textAlign:"center"}} to={`/carinfo?area=${address}&carnum=${carnum}`}>{carnum}</Link></td>
            </tr>)
            }
        })}

        {carnums.map((carnum,i)=>{
            if(cardetails[i].Active && !cardetails[i].newlyadded){  
            return(<tr key={carnum} className={cardetails[i].Active ? "Active":"Inactive"} >
            <td style={{textAlign:"center",padding:"5px 16px"}}>  <Link   style={{fontSize:13,color:'black',textAlign:"center"}} to={`/carinfo?area=${address}&carnum=${carnum}`}>{carnum}</Link></td>
            </tr>)
            }
        })}
        {carnums.map((carnum,i)=>{
            if(!cardetails[i].Active  && !cardetails[i].newlyadded){
                return(<tr key={carnum} className={cardetails[i].Active ? "Active":"Inactive"} >
                <td style={{textAlign:"center",padding:"5px 16px"}}>  <Link   style={{fontSize:13,color:'black',textAlign:"center"}} to={`/carinfo?area=${address}&carnum=${carnum}`}>{carnum}</Link></td>
                </tr>)
            } 
        })} 

        </tbody>
        </Table>
        </div>
    )
}

export default CarItem;

