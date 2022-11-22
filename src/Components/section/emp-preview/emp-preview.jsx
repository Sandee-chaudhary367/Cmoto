import React from 'react'
import Table from 'react-bootstrap/Table'
import EmpItem from './emp-item'

const EmpPreview=({address,societies})=>{
  const societiesName=Object.keys(societies);
  const Employees=Object.values(societies);
   
  return(
      
    <Table bordered responsive style={{width:"200px",marginBottom:0}}>
          <tbody>
          <tr >
          {societiesName.map((element,i)=>(
            <th className="heading" style={{fontSize:15,color:'white',background:'black',textAlign:"center"}}>{element}</th>
          ))}
          </tr>
          {Employees.map((element,i)=>( 
           <td style={{padding: 0}}><EmpItem address={address} Employees={Employees[i]} /></td>
          ))} 
          </tbody>
      </Table>
      
  )

}

export default EmpPreview;