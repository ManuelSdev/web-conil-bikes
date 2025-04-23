// @ts-nocheck
'use client'
import {
   bikesReseted,
   dateRangeSelected,
   selectBikes,
   selectDateRange,
} from '@/lib/redux/slices/bookingFormSlice'
import { useDispatch, useSelector } from 'react-redux'
//CLAVE import { Link } from 'react-transition-progress/next'

// CLAVE import { ArrowRight } from '@phosphor-icons/react'

import {
   useCreateCookieQuery,
   useLazyCreateCookieQuery,
} from '@/lib/redux/apiSlices/cookieApi'
import DateStep from './DateStep'

export default function DateStepHandler({
   setStep,
   cookieDateRange,
   className,
   isAdmin,
   userId,
   ...props
}) {
   const dispatch = useDispatch()
   const storedDateRange = useSelector(selectDateRange)
   const storedBikes = useSelector(selectBikes)
   const [triggerCookie] = useLazyCreateCookieQuery()

   const {
      data: availableSizes,
      isLoading: isLoadingSizes,
      isSuccess: isSuccessSizes,
   } = useCreateCookieQuery(
      {
         name: 'stepperDated',
         value: true,
      },
      { skip: false }
   )
   const areBikes = !!(storedBikes.length > 0)

   const dispatchBikesReseted = () => {
      dispatch(bikesReseted())
   }
   const dispatchRangeSelected = (selectedDaterange) =>
      dispatch(dateRangeSelected(selectedDaterange))

   const nextUrl = isAdmin
      ? `/dashboard/bookings/new/bikes?userId=${userId}&dated=true`
      : '/booking/bikes'

   return (
      <DateStep
         areBikes={areBikes}
         storedDateRange={storedDateRange}
         nextUrl={nextUrl}
         dispatchBikesReseted={dispatchBikesReseted}
         dispatchRangeSelected={dispatchRangeSelected}
      />
   )
}
