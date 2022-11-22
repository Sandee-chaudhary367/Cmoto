import React ,{useEffect,useState}from "react";
import { Button } from "react-bootstrap";

const InnerTable=({missed})=>{
    // console.log(missed)
    const vehicleNum = missed ? missed.todaysCars.split(',').filter(function (el) {
        return el != '';
      }) : [];
    // console.log(vehicleNum)
    const Images=[];
    const [show,setShow] = useState(false)

    const showHandler = () =>{
        setShow(!show)
    }

    // console.log(vehicleNum);
    // console.log(Images[0]['Image Url 0'])
    return (
        <table className="table table-sm table-bordered table-responsive-xl">
        <tbody>
       { show && vehicleNum.map((el,i)=>{
        if(vehicleNum[i]==="income"){
            return( 
                <tr>
                    <td style={{width:"30%"}}>{vehicleNum[i]}</td>
                    </tr>
                    )
        }else{
            return(
                <tr>
                <td style={{width:"30%"}}>{vehicleNum[i]}</td>
                </tr>
           )
        }
        })
       }
       <Button onClick={(e)=>showHandler()} className='btn btn-sm btn-danger' style={{margin:'7px'}}>{vehicleNum.length} Cars Not Cleaned</Button>
        </tbody>
        </table>
    )
}

export default InnerTable;