// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   bookingManagementSelected,
   selectBookingManagement,
} from '@/lib/redux/slices/bookingFormSlice'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'

import { ArrowArcRight, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { BookingAddressForm } from './BookingAddressForm'
import StepControls from '@/components/stepper/StepControls'
import useCheckDatedStepper from '@/hooks/useCheckDatedStepper'

const FormSchema = z.object({
   address: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
   }),
   delivery: z.boolean(),
   pickup: z.boolean(),
})

export default function BookingAddressHandler({
   setStep,
   isAdmin,
   userId,
   ...props
}) {
   useCheckDatedStepper({ userId, isAdmin })
   //console.log('BookingManagementUserHandler @@@->')
   const dispatch = useDispatch()

   /** BookingManagementForm **/
   const bookingManagement = useSelector(selectBookingManagement)

   const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         ...bookingManagement,
      },
   })

   useEffect(() => {
      //console.log('useEffect bookingManagement ->', bookingManagement)
      //  form.setValue('address', bookingManagement.address)
      //  form.setValue('delivery', bookingManagement.delivery)
      //  form.setValue('pickup', bookingManagement.pickup)
      return () => {
         //Si pongo esto en el cuerpo del componente no pilla los valores....?¿
         const { address, delivery, pickup } = form.getValues()
         dispatch(bookingManagementSelected({ address, delivery, pickup }))
      }
   }, [])

   const nextUrl = isAdmin
      ? `/dashboard/bookings/new/resume?userId=${userId}`
      : '/booking/resume'
   const prevUrl = isAdmin
      ? `/dashboard/bookings/new/bikes?userId=${userId}`
      : '/booking/bikes'

   const renderNextButton = (renderClassName) => {
      const { address } = form.getValues()
      const isDisabled = !address

      return isDisabled ? (
         <Button disabled variant="custom" className={renderClassName}>
            Siguiente <ArrowRight weight="bold" className="ml-2 h-4 w-4" />
         </Button>
      ) : (
         <Button asChild variant="custom" className={renderClassName}>
            <Link href={nextUrl}>
               Siguiente <ArrowRight weight="bold" className="ml-2 h-4 w-4" />
            </Link>
         </Button>
      )
   }

   const renderPrevButton = (renderClassName) => (
      <Button variant="custom" className={renderClassName} asChild>
         <Link href={prevUrl}>
            {' '}
            <ArrowLeft weight="bold" className="mr-2 h-4 w-4" /> Atrás
         </Link>
      </Button>
   )
   return (
      <div>
         <BookingAddressForm form={form} />
         <StepControls
            renderNextButton={renderNextButton}
            renderPrevButton={renderPrevButton}
         />
      </div>
   )
}
