import firebase from '../../firebase/firebase.utils.js'
import React, { useState } from 'react'
import "./insection.css"
import { Link } from 'react-router-dom'


const Insection = ({ workersInfo,uid }) => {
  // console.log(workersInfo[1]['Interior Work History'])
  console.log(getDate(0))
  let arr = new Array(5);
 
  for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(workersInfo.length);
  }

  const [carToshow,setcarToshow]=useState(arr);
  const weekday = {
    textAlign: 'center',
    border: '1px solid #e9ecef',
    marginBottom: 0.75,
    padding: 7,
    fontSize: 14,
    color: 'black',
    cursor: "pointer",
  }
  const carstyle = {
    textAlign: 'center',
    border: '1px solid #e9ecef',
    marginBottom: 0.75,
    padding: 7,
    fontSize: 14,
    color: 'black',
  }
  const col = function (el) {
    let co = ''
    firebase
      .database()
      .ref(`Car Status/${el}/Interior Cleaning status`)
      .on('value', (snapshot) => {
        if (snapshot.val() === 'cleaned') {
          co = 'lightgreen'
        } else if (snapshot.val() === 'scanned') {
          co = 'yellow'
        } else if (snapshot.val() === 'In waiting') {
          co = 'red'
        }
      })
    return co
  }

  const imageLink = (el) => {
    let link = ''
    firebase
      .database()
      .ref(`Car Status/${el}/Interior Work History/${getTodayDate()}`)
      .on('value', (snapshot) => {
        link = snapshot.val()
      })
    return link
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

  const countClusterLength=(a)=>{
    
   let clusterArr= a.split(",");
   let count=0;
   for(let i=0;i<clusterArr.length;i++){
     if(clusterArr[i]!==""){
       count=count+1;
     }
   }
    return count;
  }

  const showWeekCarHandler=(e)=>{
   let xy=(e.target.id).split(",");
   let x=parseInt(xy[0])
   let y=parseInt(xy[1])

   let refarr=carToshow;
    if(carToshow[x][y]===1){
      refarr[x][y]=0
    }else{
      refarr[x][y]=1
    }

    let arrNew = new Array(5);
 
    for (let i = 0; i < arrNew.length; i++) {
        arrNew[i] = new Array(workersInfo.length);
    }

    for (let i = 0; i < arrNew.length; i++) {
      for (let j = 0; j < workersInfo.length; j++) {
          arrNew[i][j] = refarr[i][j];
      }
    }

   setcarToshow(arrNew);
  }

  function getDate(n) {
    var todayUs = new Date()
    var offset = '+5.5' // since database belongs to US
    var utc = todayUs.getTime() + todayUs.getTimezoneOffset() * 60000 // therefore converting time to IST
    var ret = new Date(utc + 3600000 * offset)
    ret.setDate(ret.getDate() + n + 1 - (ret.getDay() || 7));
    // ret.setDate( (n - 1 + 7 - ret.getDay() ) % 7 + 1);
    var dd = String(ret.getDate()).padStart(2, '0')
    var mm = String(ret.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = ret.getFullYear()
    var today = yyyy + '-' + mm + '-' + dd
    return today
}

  return (
    <div class='card'>
      <div class='card-body'>
        <table>
          <tbody>
            {workersInfo.map((workerInfo, i) => (
              <td style={{verticalAlign:"top"}}>
                <h1
                  style={{
                    textAlign: 'center',
                    border: '1px solid #e9ecef',
                    marginBottom: 0.75,
                    padding: 14,
                    fontSize: 20,
                    color: 'white',
                    backgroundColor: 'black'
                  }}
                >
                <Link to={`/empinfo?uid=${uid[i]}&address=InteriorEmployees`}>{workerInfo.Name}</Link>
               
                </h1>
                <h2 id={`0,${i}`} className="Weekdays" onClick={showWeekCarHandler} style={weekday}>Monday ({countClusterLength(workerInfo.mondayCars)})</h2>
                {carToshow[0][i]===1 && <div>
                  {workerInfo.mondayCars.split(',').map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: col(el) }}>
                        {el}
                      </h5>
                    )
                  })}
                  {workerInfo['Interior Work History'] && workerInfo['Interior Work History'][getDate(0)] && Object.keys(workerInfo['Interior Work History'][getDate(0)]).map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: 'lightgreen' }}>
                        {el}
                      </h5>
                    )
                  })}
                </div>}
                <h2 id={`1,${i}`} className="Weekdays" onClick={showWeekCarHandler} style={weekday}>Tuesday ({countClusterLength(workerInfo.tuesdayCars)})</h2>
                 {carToshow[1][i]===1 && <div>
                  {workerInfo.tuesdayCars.split(',').map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: col(el) }}>
                        <a target='__blank__' href={imageLink(el)}>
                          {el}
                        </a>
                      </h5>
                    )
                  })}
                  {workerInfo['Interior Work History'] && workerInfo['Interior Work History'][getDate(1)] && Object.keys(workerInfo['Interior Work History'][getDate(1)]).map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: 'lightgreen' }}>
                        {el}
                      </h5>
                    )
                  })}
                </div>}
                <h2 id={`2,${i}`} className="Weekdays" onClick={showWeekCarHandler} style={weekday}>Wednesday ({countClusterLength(workerInfo.wednesdayCars)})</h2>
                 { carToshow[2][i]===1 && <div>
                  {workerInfo.wednesdayCars.split(',').map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: col(el) }}>
                        {el}
                      </h5>
                    )
                  })}
                  {workerInfo['Interior Work History'] && workerInfo['Interior Work History'][getDate(2)] && Object.keys(workerInfo['Interior Work History'][getDate(2)]).map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: 'lightgreen' }}>
                        {el}
                      </h5>
                    )
                  })}
                </div>}
                <h2 id={`3,${i}`} className="Weekdays" onClick={showWeekCarHandler} style={weekday}>Thursday ({countClusterLength(workerInfo.thursdayCars)})</h2>
                 { carToshow[3][i]===1 && <div>
                  {workerInfo.thursdayCars.split(',').map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: col(el)}}>
                        {el}
                      </h5>
                    )
                  })}
                  {workerInfo['Interior Work History'] && workerInfo['Interior Work History'][getDate(3)] && Object.keys(workerInfo['Interior Work History'][getDate(3)]).map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: 'lightgreen' }}>
                        {el}
                      </h5>
                    )
                  })}
                </div>}
                <h2 id={`4,${i}`} className="Weekdays" onClick={showWeekCarHandler} style={weekday}>Friday ({countClusterLength(workerInfo.fridayCars)})</h2>
                 { carToshow[4][i]===1 && <div>
                  {workerInfo.fridayCars.split(',').map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: col(el) }}>
                        {el}
                      </h5>
                    )
                  })}
                  {workerInfo['Interior Work History'] && workerInfo['Interior Work History'][getDate(4)] && Object.keys(workerInfo['Interior Work History'][getDate(4)]).map((el, i) => {
                     if(el===""){
                      return (
                        <div></div>
                      )
                    }
                    return (
                      <h5 style={{ ...carstyle, backgroundColor: 'lightgreen' }}>
                        {el}
                      </h5>
                    )
                  })}
                </div>}
              </td>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Insection