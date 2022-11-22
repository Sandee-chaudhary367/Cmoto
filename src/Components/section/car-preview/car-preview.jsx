import React, { useEffect,useState } from 'react'
import './car-preview.css'
import Table from 'react-bootstrap/Table'
import CarItem from './car-items/car-items.jsx'

const CarPreview=({societies,area,carInArea})=>{
    const societiesName=Object.keys(societies);
    const vehicles=Object.values(societies);
    const [carInAr,setCarInAr]=useState([]);

    let carInAppArr=[]
    const carInAppartment=(num)=>{
        carInAppArr.push(num);
    }
    
    useEffect(()=>{
      const a=carInAppArr.reduce((acc,ele)=>{
        return acc=acc+ele
      });
      carInArea(a)
      setCarInAr(carInAppArr);
    },[]);

  return(
      <Table bordered responsive style={{width:"200px",marginBottom:0}}>
      
          <tbody>
          <tr >
              {societiesName.map((element,i)=>(
                <td key={i} style={{width:"200px",fontSize:15,color:'white',background:'black',textAlign:"center"}}>{element} ({carInAr[i]})</td>
              ))} 
          </tr>
     
          <tr >
          {vehicles.map((element,i)=>(
           <td key={i} style={{padding: 0}}><CarItem address={`${area}/${societiesName[i]}`} carInAppartment={carInAppartment} vehicles={vehicles[i]}/></td>
          ))}
          </tr>
          
          </tbody>

      </Table>
  )
}

export default CarPreview;