// @ts-nocheck
'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import {
   formReseted,
   reset,
   selectBookingData,
} from '@/lib/redux/slices/bookingFormSlice'
import { useLazyCreateCookieQuery } from '@/lib/redux/apiSlices/cookieApi'
import { useCreateBookingMutation } from '@/lib/redux/apiSlices/bookingApi'
import { dateRangeISOStringObjToString } from '@/utils/datesFns/createDateRangeString'

import BookingResume from './BookingResume'
import Link from 'next/link'
//import { ArrowLeft } from '@phosphor-icons/react'
import { ArrowLeft } from 'lucide-react'
import useDialogWindow from '@/components/common/useDialogWindow'
import { DialogWindow } from '@/components/common/DialogWindow'
import { DialogLoader } from '@/components/common/DialogLoader'
import { useRouter } from 'next/navigation'

export default function BookingResumeHandler({
   setStep,
   user,
   isAdmin = false,
   adminId,

   ...props
}) {
   const [triggerCookie] = useLazyCreateCookieQuery()
   const router = useRouter()
   const dispatch = useDispatch()

   const { userId, email, name, phone } = user

   const {
      bikes,
      bikesByUnits,
      dayPrice,
      dateRange,
      duration,
      bookingPrice,
      address,
      delivery,
      pickup,
   } = useSelector(selectBookingData)
   console.log('dateRange ->', dateRange)
   const strDateRange = dateRangeISOStringObjToString(dateRange)

   const { dialog, handleSetDialog } = useDialogWindow(null)

   const queryData = {
      adminId,
      bikes,
      userId,
      isAdmin,
      dateRange: strDateRange,
      address,
      bookingPrice,
      email,
      delivery,
      pickup,
      duration,
      //necesitas estos para el email
      dateRangeObj: dateRange,
      bikesByUnits,
      dayPrice,
      phone,
      address,
      name,
   }

   const resumeData = {
      name,
      phone,
      email,
      address,
      delivery,
      pickup,
      bikesByUnits,
      dateRange,
      dayPrice,
      bookingPrice,
      duration,
   }
   const [
      createBooking,
      {
         // status,
         //  isUninitialized,
         isLoading,
         isSuccess,
         data,
         isError,
         error,
         reset,
      },
   ] = useCreateBookingMutation()
   //useCreateBookingMutation({ fixedCacheKey: 'createBooking-key' })
   // console.log('userId ->', userId)

   const handleSubmit = async (event) => {
      event.preventDefault()
      console.log('queryData ->', queryData)
      const urlAfterBooking = isAdmin ? '/dashboard/bookings/calendar' : '/'
      //const emailHtml = getOrderResumeEmail(bookingData)
      try {
         const res = await createBooking(queryData).unwrap()
         console.log('res ->', res)
         /*  const desc = (
            <span>
               Te hemos enviado un correo electrónico a{' '}
               <span className="font-semibold">{email}</span> con los detalles
               de tu reserva
            </span>
         )*/
         handleSetDialog({
            open: true,
            title: 'Tu reserva ha sido registrada',
            description: 'Recibiras un correo con los detalles de tu reserva',
            closeText: 'Aceptar',
            onOpenChange: (bool) => router.push(urlAfterBooking),
         })
      } catch (error) {
         console.log('error ->', error)
         handleSetDialog({
            open: true,
            title: 'Ha ocurrido un error',
            description:
               'No se ha podido registrar tu reserva. Por favor, inténtalo de nuevo pasados unos minutos.',
            closeText: 'Aceptar',
            onOpenChange: (bool) => router.push(urlAfterBooking),
         })
      }
   }

   const renderPrevButton = (className) => {
      const prevUrl = isAdmin
         ? `/admin/bookings/new/address?userId=${userId}`
         : '/booking/address'
      return (
         <Button asChild variant="custom" className={className}>
            <Link href={prevUrl}>
               <ArrowLeft weight="bold" className="mr-2 h-4 w-4" />
               atrás
            </Link>
         </Button>
      )
   }

   const renderSubmitButton = (className) => (
      <Button
         type="submit"
         variant="custom"
         className={className}
         onClick={handleSubmit}
      >
         CONFIRMAR RESERVA
      </Button>
   )
   console.log('isLoading ->', isSuccess)
   return (
      <div>
         <DialogLoader open={isLoading} />
         <DialogWindow {...dialog} />

         <BookingResume
            renderPrevButton={renderPrevButton}
            renderSubmitButton={renderSubmitButton}
            {...resumeData}
         />
      </div>
   )
}

function createBookingResumeCookie({ bikes, bookingManagement, dateRange }) {
   const bikesData = bikes.map((bike) => ({
      modelId: bike.modelId,
      bikeSize: bike.bikeSize,
   }))
   const managementData = { ...bookingManagement }
   const dateRangeData = { ...dateRange }
   const cookieValue = JSON.stringify({
      bikesData,
      managementData,
      dateRangeData,
   })
   return cookieValue
}
