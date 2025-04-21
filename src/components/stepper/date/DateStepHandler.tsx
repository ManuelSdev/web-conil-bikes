// @ts-nocheck
'use client'
import {
   bikesReseted,
   dateRangeSelected,
   selectBikes,
   selectDateRange,
} from '@/lib/redux/slices/bookingFormSlice'
import {
   dateRangeISOStrObjToDateRangeObj,
   dateRangeISOStringObjToString,
   dateRangeObjToISOStringObj,
} from '@/utils/datesFns/createDateRangeString'
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
   const { isoFrom, isoTo } = storedDateRange
   const storedBikes = useSelector(selectBikes)
   const dateRangeObj = dateRangeISOStrObjToDateRangeObj(storedDateRange)
   const { from, to } = dateRangeObj
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
   const areBikes = !!storedBikes.length > 0

   const handleSelect = (picker) => (selectedDate) => {
      const newDateRangeObj = { ...dateRangeObj, [picker]: selectedDate }
      const isoStringRangeObj = dateRangeObjToISOStringObj(newDateRangeObj)
      const strDateRange = dateRangeObjToISOString(newDateRangeObj)
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
         from={from}
         to={to}
         storedDateRange={storedDateRange}
         bikesReseted={bikesReseted}
         handleSelect={handleSelect}
         nextUrl={nextUrl}
         onDispatch={dispatchBikesReseted}
      />
   )
}

function dateRangeObjToISOString(dateRange) {
   //console.log('dateRange @->', dateRange)
   const isoStringRangeObj = dateRangeObjToISOStringObj(dateRange)
   ////console.log('isoStringRangeObj ->', isoStringRangeObj)
   const strDateRange = dateRangeISOStringObjToString(isoStringRangeObj)
   ////console.log('strDateRange ->', strDateRange)
   return strDateRange
}
