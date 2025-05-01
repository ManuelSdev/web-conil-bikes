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

import Stepper from '@/components/stepper/Stepper'
import {
   getAppBikeSegments,
   getUserPageAuth,
} from '@/utils/serverFns/serverFns'

import StepShell from '@/components/stepper/StepShell'
import AvailableBikeListHandler from '@/components/stepper/bikes/AvailableBikeListHandler'
import BikesStepHandler from '@/components/stepper/bikes/BikesStepHandler'
import NotifyCart from '@/components/stepper/notifyCart/NotifyCart'
import { verifySessionCookie } from '@/lib/firebase/admin/verifySessionCookie'
import { NextResponse } from 'next/server'
import { logout } from '@/domain/services/authServices'

/**
 * CLAVE
 * https://github.com/vercel/next.js/discussions/54075
 */
export default async function BikesStepPage({ params }) {
   const cookieStore = await cookies()
   const all = cookieStore.getAll()
   //console.log('all cookies ', all)
   const searchKeysCookie = cookieStore.get('searchKeys')
   const resolvedUrlCookie = cookieStore.get('resolvedUrl')
   const userSessionCookie = cookieStore.get('userSession')
   //console.log('userSessionCookie ', userSessionCookie)
   //const response = NextResponse
   //corre

   // console.log('searchKeysCookie ', searchKeysCookie)
   //const selectedBikeCookie = cookies().get('selectedBike')
   //uf('stepperDated')
   //Cargo las searchKeys de la cookie
   const loadedSearchKeys = searchKeysCookie
      ? JSON.parse(searchKeysCookie.value)
      : null
   console.log('loadedSearchKeys ', loadedSearchKeys)
   let isLogged = false
   try {
      if (!userSessionCookie) throw new Error('No hay cookie de sesión')
      //Compruebo loggin mediante la cookie de sesión
      const decodeClaims = await verifySessionCookie(userSessionCookie)
      isLogged = true
      //Compruebo si hay que recuperar los datos de la búsqueda previa
      const loadedPreviusStateData =
         await loadPreviusStateData(loadedSearchKeys)
   } catch (error) {
      const { code, message } = error
      console.error('Error al verificar la cookie de sesión', error)
      // console.dir(error, { depth: null })
      if (
         code === 'auth/session-cookie-expired' ||
         code === 'auth/session-cookie-revoked'
      ) {
         //   logout(userSessionCookie.name)
         // Si la cookie de sesión ha expirado, redirijo a la página de login
         //redirect('/login')
         //  console.log('La cookie de sesión ha expirado')
      }
      // const isLogged = false
   }
   console.log('isLogged ', isLogged)
   //const userAuth = await getUserPageAuth()
   //const { isLogged } = userAuth
   const loadedPreviusStateData = await loadPreviusStateData(loadedSearchKeys)
   console.log('loadedPreviusStateData ', loadedPreviusStateData)
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
   //console.log('segmentList ', segmentList)
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
async function loadPreviusStateData(searchKeys) {
   //'use server'
   //https://github.com/vercel/next.js/discussions/54075
   console.log('searchKeys ', searchKeys)

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
   const {
      data: { availableBikes },
   } = await availableBikesRes.json()

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
