import React, { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import firebase from './../firebase/firebase.utils'
import Loader from './Loader'

const DragAndDrop = ({ society }) => {
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  useEffect( () => {
    var objects = {}
    var tc = []

     firebase
      .database()
      .ref(`cars/${society}`).orderByChild('Active').equalTo(1)
      .once('value', (snap) => {
        var cars = []
        if(snap.val()!==null)
         cars = Object.keys(snap.val())
        tc = cars
        // console.log(cars)

        firebase
        .database()
        .ref(`Employees/${society}`)
        .once('value', (snap) => {
          // console.log(snap.val())
  
          snap.forEach((element) => {
            var cars = element
              .val()
              .Cluster.replace(/\s+/g, '')
              .split(',')
              .filter((el) => {
                return el != ''
              })
            // console.log(cars)
            // console.log(tc)
            tc = tc.filter((el) => !cars.includes(el))
            objects[[element.key]] = {
              Name: element.val().Name,
              items: cars,
            }

            
          })

          objects['Total Cars'] = {
            Name: 'Total Cars',
            items: tc,
          }
      
          setColumns(objects)
          setLoading(false)
          // console.log(objects)
        })

      })

   

    
  }, [])

  const [columns, setColumns] = useState({})
  const [loading, setLoading] = useState(true)
  console.log(columns)

  const submitHandler = () => {
    for (let employee in columns) {
      if (employee !== 'Total Cars'){
        console.log(columns[employee].items)
        // console.log(employee)
        const cars = columns[employee].items
        var ref = firebase.database().ref('Employee/' + employee)
        ref.update({ todaysCars: columns[employee].items.join(',') })
        ref.update({ Cluster: columns[employee].items.join(',') })
        var ref2 = firebase
          .database()
          .ref('Employees/' + society + '/' + employee)
        ref2.update({ todaysCars: columns[employee].items.join(',') })
        ref2.update({ Cluster: columns[employee].items.join(',') })

        for(let car in cars){
          firebase.database().ref(`Car Status/${cars[car]}/newlyadded`).set(false)
          firebase.database().ref(`cars/${society}/${cars[car]}/newlyadded`).set(false)
        }

      }
    }
    alert('Cars Duties Updated')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {loading && <Loader />}
      <button
        className='btn btn-primary'
        style={{ marginBottom: '20px' }}
        onClick={() => submitHandler()}
      >
        {' '}
        Update Duties{' '}
      </button>
      <div
        style={{display: 'flex', justifyContent: 'center', height: '100%' }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={columnId}
              >
                <h2>
                  {column.Name} ({column.items.length})
                </h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : 'lightgrey',
                            padding: 4,
                            width: 200,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item}
                                draggableId={item}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '20px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default DragAndDrop