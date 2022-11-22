import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

const AreaTable = ({ area, societies }) => {
  return (
    <div class='card'>
      <div class='card-body'>
        <div className='Section'>
          <div class='d-flex justify-content-between'>
            <h1
              className='heading'
              style={{ fontSize: 20, color: 'black', fontWeight: '700' }}
            >
              {area}
            </h1>
          </div>
          <Table bordered responsive>
            <tbody>
              <Table bordered>
                <thead>
                  <tr>
                    {Object.keys(societies).map((element, i) => (
                      <th
                        className='heading'
                        style={{
                          fontSize: 15,
                          color: 'white',
                          background: 'black',
                          textAlign: 'center',
                        }}
                      >
                        <Link
                          to={`/setDuties?society=${area}/${element}`}
                          style={{ color: 'white' }}
                        >
                          {element}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default AreaTable
