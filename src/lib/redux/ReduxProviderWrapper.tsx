// @ts-nocheck
'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { reduxStore } from './store'

export default function ReduxProviderWrapper({ children }) {
   return <Provider store={reduxStore}>{children}</Provider>
}
