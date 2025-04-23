// @ts-nocheck
'use client'
import {
   bookingManagementSelected,
   selectBookingManagement,
} from '@/lib/redux/slices/bookingFormSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

//import { ArrowArcRight, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import useCheckDatedStepper from '@/hooks/useCheckDatedStepper'
import BookingAddress from './BookingAddress'

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
   const dispatch = useDispatch()

   /** BookingManagementForm **/
   const bookingManagement = useSelector(selectBookingManagement)
   const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         ...bookingManagement,
      },
   })
   const { address } = form.watch()

   useEffect(() => {
      return () => {
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

   return (
      <BookingAddress
         form={form}
         address={address}
         nextUrl={nextUrl}
         prevUrl={prevUrl}
      />
   )
}
