import React ,{useEffect,useState}from "react";
import { Button } from "react-bootstrap";

const InnerTable=({Prove,address})=>{
    console.log(Prove)
    const vehicleNum = Object.keys(Prove);
    const Images=Object.values(Prove);
    const [show,setShow] = useState(false)

    const showHandler = () =>{
        setShow(!show)
    }

    return (
        <table className="table table-sm table-bordered table-responsive-xl">
        <tbody>
       { show && vehicleNum.map((el,i)=>{
        if(vehicleNum[i]==="income"){
            return( 
                <tr>
                    <td style={{width:"30%"}}>{vehicleNum[i]}</td>
                   <td colspan="2">{Images[i]}</td>
                    </tr>
                    )
        }else{
            return(
                <tr>
                <td style={{width:"30%"}}>{vehicleNum[i]}</td>
                <td>{Images[i]['Image Url 4']?<a target="__blank__" href={Images[i]['Image Url 4']}>Go to image</a>:<div>No Image</div>}</td>
                </tr>
           )
        }
        })
       }
       <Button onClick={(e)=>showHandler()} className='btn btn-sm btn-success' style={{margin:'7px'}}>{address==="Employee" ? vehicleNum.length-1 : vehicleNum.length} Cars Cleaned</Button>
        </tbody>
        </table>
    )
}

export default InnerTable;