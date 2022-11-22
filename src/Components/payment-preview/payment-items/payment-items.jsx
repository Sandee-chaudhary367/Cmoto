import {React,useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import './payment-items.styles.css'
import firebase from '../../../firebase/firebase.utils'



const PaymentItem=({vehicles,address,carInAppartment})=>{
   const carnums=Object.keys(vehicles)
   const cardetails=Object.values(vehicles)

   carInAppartment(carnums.length);

   const getTodaysDate = () =>  {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    return today.toString()
}

     function getClass(){
        carnums.map((carnum,i)=>{
        
          firebase.database().ref('Car Status').child(carnum).once('value',(snapshot)=>{
            const car = snapshot.val();
            let lastMonthPaid = 0;
            if(car && car['Payment History'])
                lastMonthPaid = Object.keys(car['Payment History']).length
            
            if(car && car['Payment History']){
                if(car['Payment History'][getTodaysDate()]){
                   
                    document.getElementById(address+carnum).className='thisMonth'
                }
                else if(Object.keys(car['Payment History'])[lastMonthPaid-1].substr(0,7)===getTodaysDate().substr(0,7)){
                    
                    document.getElementById(address+carnum).className='today'
                }
            }else{
                
                document.getElementById(address+carnum).className='issue'
            }
        })

    })
    }

    Object.size = function(obj) {
        var size = 0,
          key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };

    useEffect(()=>{
        getClass() 
    },[])

    

    return(
        <>
            <Table bordered style={{maxWidth:"400px"}} >
            <tbody>
            {carnums.map((carnum,i)=>(
                <tr  id={address+carnum}>
                    <td style={{textAlign:"center"}}><Link style={{fontSize:14,color:'black',textAlign:"center"}} to={`/carinfo?area=${address}&carnum=${carnum}`}>{carnum}</Link></td>
                </tr>
            ))} 
        </tbody>
            </Table>
        </>
    )
}

export default PaymentItem;

