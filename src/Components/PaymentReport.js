import React from 'react'
import Section from '../Components/section/section'
import AreaSocieties from '../Components/AreaSocieties.js'
import PaymentPreview from '../Components/payment-preview/payment-preview'
import ExlivePreview from '../Components/section/exlive-preview/exlive-preview.jsx'

const PaymentReport = () => {
  return (
    <>
      <AreaSocieties
        address={'cars'}
        component={Section}
        component2={PaymentPreview}
      />
    </>
  )
}

export default PaymentReport
