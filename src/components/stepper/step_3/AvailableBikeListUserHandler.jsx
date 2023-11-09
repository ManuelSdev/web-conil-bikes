'use client'
import React from 'react'
import AvailableBikesList from './AvailableBikeList'
import { useGetAvailableBikesQuery } from '@/lib/redux/apiSlices/bikeApi'
import { useDispatch, useSelector } from 'react-redux'
import {
   bikeSelected,
   selectBikesearchParams,
   selectDateRange,
} from '@/lib/redux/slices/bookingFormSlice'
import { Button } from '@/components/ui/button'
import AvailableBikeListStep from './AvailableBikeListStep'
import { dateRangeISOStringObjToString } from '@/utils/datesFns/createDateRangeString'

export default function AvailableBikeListUserHandler({ setStep }) {
   const storedDateRange = useSelector(selectDateRange)
   const dateRange = dateRangeISOStringObjToString(storedDateRange)
   const bikeSearchParams = useSelector(selectBikesearchParams)
   const {
      data: availableBikes,
      isLoading,
      isSuccess,
      refetch,
      isFetching,
   } = useGetAvailableBikesQuery({ dateRange, ...bikeSearchParams })
   console.log('availableBikes ->', availableBikes)
   const dispatch = useDispatch()

   const handleSelect = (bike) => (ev) => {
      console.log('bike ->', bike)
      dispatch(bikeSelected(bike))
      setStep(1)
   }
   const renderPrevButton = () => (
      <Button onClick={() => setStep(2)} className="text-greenCorp">
         atrás
      </Button>
   )
   return isLoading ? (
      <div>LOADINGFGGG</div>
   ) : (
      <AvailableBikeListStep
         isLogged={true}
         availableBikes={availableBikes}
         renderSelectBikeButton={(bike) => (
            <Button onClick={handleSelect(bike)}>Seleccionar</Button>
         )}
         renderPrevButton={renderPrevButton}
      />
   )
}