import React ,{useEffect,useState}from "react";
import firebase from '../../firebase/firebase.utils.js'
import InnerTable from "./innerTable/innerTable.jsx";
import InnerTable2 from "./innerTable/innerTable2.jsx";



const EmpWorkHistory = ({address,uid})=>{
    const [Dat, setDate] = useState([]);
    const [Prove, setProve] = useState([]);
    const [missed, setMissed] = useState({});
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
      console.log(address)
      var workHistory = address==="Employee" ? 'Work History' : 'Interior Work History'
      firebase
      .database()
      .ref(`${address}/${uid}/${workHistory}`)
      .on(
        'value',
        (snapshot) => {
            const a = []
            const s = []
        snapshot.forEach((element) => {
            a.push(element.key)
            s.push(element.val())
      })
      setDate(a.reverse())
      setProve(s.reverse())
      setLoading(false)
        },
        (err) => {
          console.log(err)
        }
      ) 

      firebase.database().ref(`${address}/${uid}/Missed Car History`)
      .on('value',(snap)=>{
        if(snap.val()){
          console.log(snap.val())
        setMissed(snap.val())
        }
      })
    
    
    },[])

      return(
            <div>
            {loading ? null:
            <div class="card">
            <div class="card-body">
            <h3>Work History</h3>
                <table className="table  table-bordered table-responsive-xs" style={{border:"solid black 2px"}} >
                    <thead className="bg-dark">
                        <tr>
                            <th style={{fontSize:15,color:'white',textAlign:"center"}} scope="col">Date</th>
                            <th style={{fontSize:15,color:'white',textAlign:"center"}} scope="col">Image Url</th>
                        </tr>
                    </thead>
                    <tbody>
                          {Dat.map((element,i)=>(
                          <tr style={{fontSize:15,color:'black',textAlign:"center",border:"solid black 2px"}}>
                          <td>{element}</td>
                            <InnerTable address={address} Prove={Prove[i]}/>
                            <InnerTable2 address={address} missed={missed[element]}/>
                          </tr>
                          ))} 
                    </tbody>
                </table>
                </div>
                </div>
            }
            </div>
        )
}

export default EmpWorkHistory;