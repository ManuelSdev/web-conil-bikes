import {
   getAppBikeConfigSegments,
   getAvailableBikes,
   getAvailableRanges,
   getAvailableSizesInRange,
   getAvailableTypes,
} from '@/lib/pg/crud/bikes'
import { cookies } from 'next/headers'

import React from 'react'

import Step from '@/components/stepper/Step'
import {
   getAppBikeSegments,
   getUserPageAuth,
} from '@/utils/serverFns/serverFns'

import StepShell from '@/components/stepper/StepShell'
import NotifyCart from '@/components/stepper/NotifyCart'
import AvailableBikeListHandler from '@/components/stepper/bikes/AvailableBikeListHandler'
import BikesStepHandlerTest from '@/components/stepper/bikes/BikesStepHandlerTest'
export default async function BikesStepPage({ params }) {
   const searchKeysCookie = cookies().get('searchKeys')
   //const selectedBikeCookie = cookies().get('selectedBike')

   const loadedSearchKeys = searchKeysCookie
      ? JSON.parse(searchKeysCookie.value)
      : null

   const loadedPreviusStateData = await loadPreviusStateData(loadedSearchKeys)
   /*
   const selectedBike = selectedBikeCookie
      ? JSON.parse(selectedBikeCookie.value)
      : null
*/
   const { segmentList } = await getAppBikeSegments()

   const userAuth = await getUserPageAuth()

   console.log('##### userAuth ', userAuth)
   console.log('params ', params)
   return (
      <StepShell
         title={'Bicicletas'}
         description="Selecciona las bicicletas que deseas añadir a tu reserva"
      >
         <Step step={2} page="bikes">
            <BikesStepHandlerTest
               segmentList={segmentList}
               loadedSearchKeys={loadedSearchKeys}
               loadedData={loadedPreviusStateData}
               // selectedBike={selectedBike}
            />
         </Step>
         <AvailableBikeListHandler
            loadedAvailableBikes={loadedPreviusStateData?.availableBikes}
            isLogged={userAuth.isLogged}
         />
         <NotifyCart page={'bikes'} />
      </StepShell>
   )
}

async function getPageData(userSessionCookie) {
   const resAppBikesConfigSegments = await getAppBikeConfigSegments()
   const segmentList = await resAppBikesConfigSegments.json()

   return { segmentList }
}

//Recupera los datos de la búsqueda de bicicletas que se realizó antes del login
async function loadPreviusStateData(searchKeys) {
   if (!searchKeys) return null

   const { dateRange, size, type, range } = searchKeys

   const availableSizesRes = await getAvailableSizesInRange({ dateRange })
   const availableSizes = await availableSizesRes.json()

   const availableTypesRes = await getAvailableTypes({ dateRange, size })
   const availableTypes = await availableTypesRes.json()

   const availableRangesRes = await getAvailableRanges({
      dateRange,
      size,
      type,
   })
   const availableRanges = await availableRangesRes.json()

   const availableBikesRes = await getAvailableBikes({
      ...searchKeys,
   })
   const availableBikes = await availableBikesRes.json()

   return {
      availableSizes,
      availableTypes,
      availableRanges,
      availableBikes,
   }
}
/*
   <StepLayout>
            {' '}
            <BikeFiltersStepHandler segmentList={segmentList} />
         </StepLayout>
         */
