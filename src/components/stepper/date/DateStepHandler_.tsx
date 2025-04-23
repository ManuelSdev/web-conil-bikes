//@ts-nocheck
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
import { DateRange } from '@/types/dateTypes'
import {
   serializeDateRangeISOString,
   dateRangeISOStrObjToDateRangeObj,
   dateRangeObjToISOStringObj,
} from '@/utils/datesFns/dateUtils'

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
   //console.log('storedDateRange', storedDateRange)
   //const { from, to } = dateRangeISOStrObjToDateRangeObj(storedDateRange)

   const storedBikes = useSelector(selectBikes)
   // console.log('from, to', from, to)
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

   const handleSelect = (picker: string) => (selectedDate: DateRange) => {
      const newDateRangeObj = { from, to, [picker]: selectedDate }
      const isoStringRangeObj = dateRangeObjToISOStringObj(newDateRangeObj)
      dispatch(dateRangeSelected(isoStringRangeObj))
   }
   const dispatchBikesReseted = () => {
      dispatch(bikesReseted())
   }

   const nextUrl = isAdmin
      ? `/dashboard/bookings/new/bikes?userId=${userId}&dated=true`
      : '/booking/bikes'

   return (
      <DateStep
         areBikes={areBikes}
         //  from={from}
         //  to={to}
         storedDateRange={storedDateRange}
         bikesReseted={bikesReseted}
         handleSelect={handleSelect}
         nextUrl={nextUrl}
         onDispatch={dispatchBikesReseted}
      />
   )
}
/*
function dateRangeObjToISOString(dateRange) {
   const isoStringRangeObj = dateRangeObjToISOStringObj(dateRange)
   const strDateRange = serializeDateRangeISOString(isoStringRangeObj)
   return strDateRange
}
*/
