import React, { useEffect, useState } from 'react'
import firebase from '../firebase/firebase.utils'
import Loader from './Loader'

const AreaSocieties= ({component2:Component2,component:Component,address:Address}) => {
  const [societies, setSocieties] = useState([])
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase
      .database()
      .ref(Address)
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
          setAreas(a)
          setSocieties(s)
          setLoading(false)
        },
        (err) => {
          console.log(err)
        }
      )
  }, [Address])

  //console.log("render") //4 times
  return (
      <div className='container-fluid' style={{ paddingTop: 25 }}>
        {loading ? (
          <Loader />
        ) : (
          areas.map((area, i) => (
            <Component area={area} key={area} societies={societies[i]} address={Address} component2={Component2} />
          ))
        )}
      </div>
  )
}

export default AreaSocieties
