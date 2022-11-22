import React, { useEffect, useState } from 'react'
import firebase from './../firebase/firebase.utils'
import Loader from './Loader'
import Insection from './Insection/insection.js'

const Interiorlive = () => {
  const [workersInfo, setWorkersInfo] = useState([])
  const [uid, setUid] = useState([])
  const [loading, setLoading] = useState(true)
  const [map, setMap] = useState({})

  useEffect(() => {
    firebase
      .database()
      .ref('InteriorEmployee')
      .on(
        'value',
        (snapshot) => {
          const a = []
          const s = []
          snapshot.forEach((element) => {
            if (element.key !== 'clusters') {
              a.push(element.key)
              s.push(element.val())
            }
          })
          setWorkersInfo(s)
          setUid(a)
          setLoading(false)
        },
        (err) => {
          console.log(err)
        }
      )
    reload()
  }, [])

  const reload = () => {
    firebase
      .database()
      .ref('Car Status')
      .on('value', (snapshot) => {
        setMap(snapshot.val())
      })
  }

  return (
    <div className='main-content' id='panel'>
      <div className='container-fluid' style={{ paddingTop: 25 }}>
        {loading ? <Loader /> : <Insection workersInfo={workersInfo} uid={uid} />}
      </div>
    </div>
  )
}

export default Interiorlive
