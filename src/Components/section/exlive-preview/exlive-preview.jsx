import React, { useEffect,useState } from 'react'
import './exlive-preview.css'
import firebase from '../../../firebase/firebase.utils.js'
import Table from 'react-bootstrap/Table'
import ExliveItem from './exlive-items/exlive-items.jsx'

const ExlivePreview=({societies,area,carInArea})=>{
    const societiesName=Object.keys(societies);
    const Employees=Object.values(societies);
    const [map,setMap] = useState({})
 
    useEffect(()=>{
      reload()
    },[]);

    const reload = () => {
      firebase.database().ref('Car Status').on('value',(snapshot)=>{
        setMap(snapshot.val())
      })
    }

    

  return(
      <>
    
            <Table bordered responsive style={{width:"200px",marginBottom:0}}>
          <tbody >
          <tr >
              {societiesName.map((element,i)=>(
                <th className="heading" style={{fontSize:15,color:'white',background:'black',textAlign:"center"}}>{element}</th>
              ))}
          </tr>
     
          {Employees.map((element,i)=>(
            
           <td style={{padding: 0,margin:0}}><ExliveItem address={`${area}/${societiesName[i]}`} Employees={Employees[i]} /></td>
         
           ))} 

          
         
          </tbody>
      </Table>
      </>
  )

}

export default ExlivePreview;