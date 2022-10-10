import React from 'react'
import ContextProver from '../contexts/ContextProver'
import PageTabScreen from '../components/PageTabScreen'

export default function Routes() {
  return (
  <ContextProver>
    <PageTabScreen/>
  </ContextProver>
  )
}