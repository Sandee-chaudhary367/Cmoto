import './exlive-items.styles.css'
import React,{ useEffect, useState } from 'react'


const ExtraItem=({EmployeesDetails,Employees,address})=>{
    let ExtraCars=null;
    let ExtraCarsObj=null;
    if(EmployeesDetails.NewExtraCar && EmployeesDetails.NewExtraCar[getTodayDate()]){ 
    ExtraCars = Object.keys(EmployeesDetails.NewExtraCar[getTodayDate()]);
    ExtraCarsObj= Object.values(EmployeesDetails.NewExtraCar[getTodayDate()]);
    }



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
        
      return(<>
        {
             ExtraCars? 
                            ExtraCars.map((el,j)=>(
                                   <h3 id={`${el}/extraCar`} style={{textAlign:"center",marginBottom:0.75,padding:15,fontSize:14,color:"black",backgroundColor:"lightgrey"}}><a href={ExtraCarsObj[j][`Image Url`]} rel="noopener noreferrer" target="_blank">{el}</a> </h3> 
                             )):<h3 style={{textAlign:"center",marginBottom:0.75,padding:15,fontSize:14,color:"black"}}>No extra cars</h3>
        }
        </>
        )
  
}

export default ExtraItem;