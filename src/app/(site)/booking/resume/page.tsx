// @ts-nocheck
import Stepper from '@/components/stepper/Stepper'
import BookingResumeHandler from '@/components/stepper/resume/BookingResumeHandler'

import {
   getAdminUserAuth,
   getAppBikeSegments,
   getUserPageAuth,
} from '@/utils/serverFns/serverFns'
import React from 'react'

export default async function UserBookingStepperPage({ params }) {
   const { segmentList } = await getAppBikeSegments()
   const userAuth = await getUserPageAuth()
   console.log('#### userAuth ', userAuth)
   const { name, email, phone, userId } = userAuth
   return (
      <Stepper step={4} childClassName="sm:w-full">
         <BookingResumeHandler user={userAuth} />
      </Stepper>
   )
}
