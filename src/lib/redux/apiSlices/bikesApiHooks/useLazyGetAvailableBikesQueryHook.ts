// @ts-nocheck
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
   selectBikeSearchParams,
   selectDateRange,
} from '../../slices/bookingFormSlice'
import { useLazyGetAvailableBikesQuery } from '../bikeApi'
import { dateRangeISOStringObjToString } from '@/utils/datesFns/dateUtils'

export default function useLazyGetAvailableBikesQueryHook() {
   const bikeSearchParams = useSelector(selectBikeSearchParams)
   const storedDateRange = useSelector(selectDateRange)
   const dateRange = dateRangeISOStringObjToString(storedDateRange)

   const [
      trigger,
      {
         data: availableBikes,
         isFetching: isFetchingBikes,
         isSuccess: isSuccessBikes,
         originalArgs,
         unsubscribe,
      },
      lastPromiseInfoBikes,
   ] = useLazyGetAvailableBikesQuery()

   useEffect(() => {
      const { size, type, range } = bikeSearchParams
      const { from, to } = storedDateRange
      if (from && to && size && type && range)
         trigger({ dateRange, ...bikeSearchParams })
   }, [bikeSearchParams, storedDateRange])

   //const triggerBikes = () => trigger({ dateRange, size, type, range })

   return {
      availableBikes,
      isFetchingBikes,
      isSuccessBikes,
      lastPromiseInfoBikes,
      originalArgs,
   }
}

/*
    {
       data: availableBikes,
       isFetching: isFetchingBikes,
       isSuccess: isSuccessBikes,
       unsubscribe,
    },
    */
