// @ts-nocheck
import React from 'react'
import Stepper from '@/components/stepper/Stepper'
import NotifyCart from '@/components/stepper/notifyCart/NotifyCart'
import StepShell from '@/components/stepper/StepShell'
import BookingAddressHandler from '@/components/stepper/address/BookingAddressHandler'
export default async function AddressStepPage({ params }) {
   return (
      <StepShell
         title={'Dirección'}
         description="Indica cual será tu dirección durante la reserva y como quieres gestionar la entrega y devolución las bicicletas"
      >
         <Stepper step={3} page="address">
            <BookingAddressHandler />
         </Stepper>
         {/*  <NotifyCart page="address" />*/}
      </StepShell>
   )
}
