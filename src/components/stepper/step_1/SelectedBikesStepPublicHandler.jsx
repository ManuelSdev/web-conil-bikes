'use client'
import React from 'react'
import SelectedBikeList from './SelectedBikeList'
import MobileBottomAppBar from '@/components/layouts/site/MobileBottomAppBar'
import { useSelector } from 'react-redux'
import { selectBikes } from '@/lib/redux/slices/bookingFormSlice'
import { useRouter } from 'next/navigation'

export default function SelectedBikesStepPublicHandler({
   dateRange,
   setSubStep,
}) {
   const selectedBikes = useSelector(selectBikes)

   const router = useRouter()

   return (
      <div>
         <SelectedBikeList
            selectedBikes={selectedBikes}
            dateRange={dateRange}
            setSubStep={setSubStep}
         />
         <MobileBottomAppBar />
      </div>
   )
}
