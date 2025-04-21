// @ts-nocheck
//export const dynamic = 'force-dynamic'
import {
   getAppBikeConfigSegments,
   getAvailableBikes,
   getAvailableRanges,
   getAvailableSizesInRange,
   getAvailableTypes,
} from '@/lib/pg/crud/bikes'
import { cookies } from 'next/headers'

import React from 'react'

import Stepper from '@/components/stepper/Stepper'
import {
   getAppBikeSegments,
   getUserPageAuth,
} from '@/utils/serverFns/serverFns'

import StepShell from '@/components/stepper/StepShell'
import NotifyCart from '@/components/stepper/notifyCart/NotifyCart'
import AvailableBikeListHandler from '@/components/stepper/bikes/AvailableBikeListHandler'
import BikesStepHandler from '@/components/stepper/bikes/BikesStepHandler'

/**
 * CLAVE
 * https://github.com/vercel/next.js/discussions/54075
 */
export default async function BikesStepPage({ params }) {
   const cookieStore = await cookies()
   const searchKeysCookie = cookieStore.get('searchKeys')
   const resolvedUrlCookie = cookieStore.get('resolvedUrl')
   //corre

   console.log('searchKeysCookie ', searchKeysCookie)
   //const selectedBikeCookie = cookies().get('selectedBike')

   //Cargo las searchKeys de la cookie
   const loadedSearchKeys = searchKeysCookie
      ? JSON.parse(searchKeysCookie.value)
      : null
   console.log('loadedSearchKeys ', loadedSearchKeys)
   const userAuth = await getUserPageAuth()
   const { isLogged } = userAuth
   const loadedPreviusStateData = await loadPreviusStateData(
      loadedSearchKeys,
      isLogged
   )
   /*
   const selectedBike = selectedBikeCookie
      ? JSON.parse(selectedBikeCookie.value)
      : null
*/
   /**
    * Hay 3 formas de entrar a la página de bicicletas desde la página de login:
    * 1. Haciendo click en el botón de "Volver" del navegador en la página de login
    *    - En este caso, se conserva la cookie resolvedUrl y existe resolvedUrlCookie
    * 2. Haciendo login correctamente
    *
    *    -Se borra la cookie resolvedUrl
    *    -Se añade la cookie userSession y la cookie stepperDated:true
    *     # En este caso, bikesStepHandlerTest se encarga de:
    *    - cargar en el estado los datos de la búsqueda de bicicletas que se realizó antes del login
    *    -Necesitas cargar las bicis disponibles en función de los datos de búsqueda
    *
    * 3. Llegando desde la página date o desde la página address
    */
   const { segmentList } = await getAppBikeSegments()

   //console.log('##### userAuth ', userAuth)
   //console.log('params ', params)
   return (
      <StepShell
         title={'Bicicletas'}
         description="Selecciona las bicicletas que deseas añadir a tu reserva"
      >
         <Stepper step={2} page="bikes">
            <BikesStepHandler
               segmentList={segmentList}
               loadedSearchKeys={loadedSearchKeys}
               loadedData={loadedPreviusStateData}
               isLogged={isLogged}
               // selectedBike={selectedBike}
            />
         </Stepper>
         <AvailableBikeListHandler
            loadedAvailableBikes={loadedPreviusStateData?.availableBikes}
            isLogged={isLogged}
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

/**
 * Recupera los datos de la búsqueda de bicicletas que se realizó antes del login
 * Esto permite que, tras el login y la redirección, el formulario de búsqueda de bicicletas
 * se rellene con los datos que se habían introducido antes de hacer login
 * También se encarga de las bicicletas disponibles en
 * función de los datos de búsqueda
 */
async function loadPreviusStateData(searchKeys, isLogged) {
   //'use server'
   //https://github.com/vercel/next.js/discussions/54075
   console.log('searchKeys ', searchKeys)
   console.log('isLogged ', isLogged)
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

//export const dynamic = 'force-dynamic'
//export const revalidate = 0
/*
   <StepLayout>
            {' '}
            <BikeFiltersStepHandler segmentList={segmentList} />
         </StepLayout>
         */
