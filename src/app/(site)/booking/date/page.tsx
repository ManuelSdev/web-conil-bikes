// @ts-nocheck
import DateStepHandler from '@/components/stepper/date/DateStepHandler'

import { cookies } from 'next/headers'

import React from 'react'

import Stepper from '@/components/stepper/Stepper'
import StepShell from '@/components/stepper/StepShell'
import NotifyCart from '@/components/stepper/notifyCart/NotifyCart'

export default async function DateStepPage({ params }) {
   const cookieStore = await cookies()

   const userSessionCookie = cookieStore.get('userSession')

   //console.log('userSessionCookie ', userSessionCookie)
   return (
      <StepShell
         title={'Fecha'}
         description=" Indícanos la fecha de inicio y de finalización de tu reserva"
      >
         <Stepper step={1}>
            <DateStepHandler />
         </Stepper>
         {/*  <NotifyCart page={'date'} />*/}
      </StepShell>
   )
}
/*
  <DrawerDemo />
            <ToastDemo />
            <OrderCard />
            */
