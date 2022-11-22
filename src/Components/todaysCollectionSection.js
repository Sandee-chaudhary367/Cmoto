import firebase from './../firebase/firebase.utils.js'
import React, { useEffect, useState } from 'react'

const TodaysCollectionSection = ({ workersSnapshot }) => {
  const [workersInfo, setWorkersInfo] = useState([])

  const carstyle = {
    textAlign: 'center',
    border: '1px solid #e9ecef',
    marginBottom: 0.75,
    padding: 7,
    fontSize: 14,
    color: 'black',
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
    return today.toString()
    // return '2021-05-05'
  }

  const sum = (arr) => {
    let sum = 0
    arr.map((el) => (sum += el))
    return sum
  }

  useEffect(() => {
    var objects = []
    workersSnapshot.forEach((workerSnapshot) => {
      objects.push(workerSnapshot.val())
    })
    console.log(objects)
    setWorkersInfo(objects)
  }, [])

  return (
    <div class='row'>
      <div>
        <div className='card'>
          <div className='card-body'>
            <table>
              <tbody>
                <div>
                  {workersInfo.map((workerInfo) => (
                    <td>
                      <h1
                        style={{
                          textAlign: 'center',
                          border: '1px solid #e9ecef',
                          marginBottom: 0.75,
                          padding: 14,
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: 'white',
                          background: 'lightGreen',
                        }}
                      >
                        Collected
                      </h1>
                      <h1
                        style={{
                          textAlign: 'center',
                          border: '1px solid #e9ecef',
                          marginBottom: 0.75,
                          padding: 14,
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        {workerInfo['Name']} --->
                        {workerInfo['Payment History'][getTodayDate()]
                          ? sum(
                              Object.values(
                                workerInfo['Payment History'][getTodayDate()]
                              )
                            )
                          : 0}
                      </h1>
                      <div>
                        {workerInfo['Payment History'][getTodayDate()] &&
                          Object.keys(
                            workerInfo['Payment History'][getTodayDate()]
                          ).map((car) => {
                            console.log(
                              workerInfo['Payment History'][getTodayDate()][car]
                            )
                            return (
                              <h5 style={{ ...carstyle }}>
                                {car}--->
                                {
                                  workerInfo['Payment History'][getTodayDate()][
                                    car
                                  ]
                                }
                              </h5>
                            )
                          })}
                      </div>
                    </td>
                  ))}
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: '18px', padding: '10px' }}>
        <div className='card'>
          <h3
            style={{
              textAlign: 'center',
              border: '1px solid #e9ecef',
              marginBottom: 0.75,
              padding: 14,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              background: 'blue',
            }}
          >
            Garage Total
          </h3>
        </div>
      </div>
    </div>
  )
}

export default TodaysCollectionSection
