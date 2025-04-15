// @ts-nocheck
import { selectDateRange } from '@/lib/redux/slices/bookingFormSlice'
import { dateRangeISOStringObjToString } from '@/utils/datesFns/createDateRangeString'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function useCheckDatedStepper({ userId, isAdmin }) {
   const router = useRouter()
   const strDateRangeObj = useSelector(selectDateRange)
   const dateRange = dateRangeISOStringObjToString(strDateRangeObj)
   const { from, to } = strDateRangeObj
   const isDateRange = !!from && !!to
   useEffect(() => {
      if (!isAdmin) return
      !isDateRange &&
         router.push(`/dashboard/bookings/new/date?userId=${userId}`)
   }, [isDateRange])
}
