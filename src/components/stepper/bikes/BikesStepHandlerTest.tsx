// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import {
   useGetAppBikesConfigQuery,
   useGetAvailableBikesQueryState,
   useGetAvailableSizesQuery,
   useLazyGetAvailableBikesQuery,
} from '@/lib/redux/apiSlices/bikeApi'
import { useDispatch, useSelector } from 'react-redux'
import {
   bikeSearchParamsSelected,
   selectBikesByUnits,
   bikeSelected,
   selectDateRange,
   segmentListLoaded,
   searchKeysLoaded,
   selectBikeSearchParams,
   selectSegmentList,
   dateRangeSelected,
   bikeSearchParamsDeleted,
} from '@/lib/redux/slices/bookingFormSlice'
import {
   dateRangeISOStringObjToString,
   stringDateRangeToISOStringObj,
} from '@/utils/datesFns/createDateRangeString'
import { Button } from '@/components/ui/button'

import { cn } from '@/utils/functions'
import StepControls from '@/components/stepper/StepControls'
import Link from 'next/link'
import { Search } from 'lucide-react'
import useLazyGetAvailableBikesQueryHook from '@/lib/redux/apiSlices/bikesApiHooks/useLazyGetAvailableBikesQueryHook'
import { Loader2 } from 'lucide-react'
import { useLazyDeleteCookieQuery } from '@/lib/redux/apiSlices/cookieApi'
// clave import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import BikeFiltersForm from './BikeFiltersForm'
import { useRouter } from 'next/navigation'
import useCheckDatedStepper from '@/hooks/useCheckDatedStepper'

export default function BikesStepHandlerTest({
   setStep,
   segmentList,
   loadedSearchKeys: searchKeys,
   isAdmin,
   userId,
   loadedData,
   isLogged,
   ...props
   //appBikesConfig,
   // availableSizes,
}) {
   useCheckDatedStepper({ userId, isAdmin })
   console.log(
      'BikesStepHandlerTest ##############################->',
      searchKeys
   )
   const dispatch = useDispatch()
   const router = useRouter()
   //router.refresh()
   const [deleteCookie] = useLazyDeleteCookieQuery()

   const strDateRangeObj = useSelector(selectDateRange)
   const dateRange = dateRangeISOStringObjToString(strDateRangeObj)
   const { from, to } = strDateRangeObj
   const isDateRange = !!from && !!to

   const bikeSearchParams = useSelector(selectBikeSearchParams)
   const bikesByUnits = useSelector(selectBikesByUnits)
   const bikesQuantity = bikesByUnits.length

   const loadedSegmentList = useSelector(selectSegmentList)

   /**
    * Si tengo los datos del formulario previos, no hago la petición
    */
   const {
      data: availableSizes,
      isLoading: isLoadingSizes,
      isSuccess: isSuccessSizes,
   } = useGetAvailableSizesQuery({ dateRange }, { skip: !!loadedData })

   const {
      availableBikes,
      isFetchingBikes,
      isSuccessBikes,
      originalArgs,
      lastPromiseInfoBikes,
   } = useLazyGetAvailableBikesQueryHook()

   const [isDisabled, setIsDisabled] = useState(true)

   const handleDisabled = (newKeys) => {}
   useEffect(() => {
      const selectedBikeJson = window.localStorage.getItem('selectedBike')

      if (!selectedBikeJson && searchKeys) {
         router.refresh()
      }
   }, [])
   useEffect(() => {
      /**
       * Si vengo redireccionado de la página de login, el estado habrá
       * sido borrado, así que cargo los segmentos de bicicletas en caso de que
       * no estén cargados
       */
      const isLoadedSegmentList = loadedSegmentList.length > 0
      isLoadedSegmentList || dispatch(segmentListLoaded(segmentList))
      //Si hay una búsqueda previa, la cargo en el estado SOLO el dateRange
      /**
       *
       */

      if (searchKeys) {
         const { dateRange, size, type, range } = searchKeys
         dispatch(dateRangeSelected(stringDateRangeToISOStringObj(dateRange)))
         dispatch(bikeSearchParamsSelected({ size, type, range }))

         console.log('dispatch dateRange')
         deleteCookie('searchKeys')

         const selectedBikeJson = window.localStorage.getItem('selectedBike')
         //necesito que se hayan cargado los segmentos para poder seleccionar la bicicleta
         //(funcion addBikeToCart)
         if (selectedBikeJson && isLoadedSegmentList && isLogged) {
            console.log('selectedBikeJson ->', selectedBikeJson)
            console.log('loadedSegmentList ->', loadedSegmentList)
            const selectedBike = JSON.parse(selectedBikeJson)
            window.localStorage.removeItem('selectedBike')
            // deleteCookie('selectedBike')
            console.log('selectedBike ->', selectedBike)
            //  dispatch(searchKeysLoaded(searchKeys))
            //  console.log('selectedBike ->', selectedBike)
            selectedBike && dispatch(bikeSelected(selectedBike))
         }
      }

      //Al desmontar el componente, elimino los ultimos datos de búsqueda de bicicletas
      return () => dispatch(bikeSearchParamsDeleted())
   }, [loadedSegmentList])

   /*
   useEffect(() => {
      if (!bikeSearchParams && searchKeys) {
         const { size, type, range } = searchKeys
         dispatch(bikeSearchParamsSelected({ size, type, range }))
      }
   }, [])
*/
   /**
    * Si vengo redireccionado de un login correcto, habráy una búsqueda previa (searchKeys):
    *  la cargo en el estado y borro la cookie de búsqueda searchKeys
    * También habrá una bicicleta seleccionada, la cargo en el estado
    *  y borro la  selectedBike del local storage
    */
   /*
useEffect(() => {
  
   if (searchKeys && loadedSegmentList && isLogged) {
      deleteCookie('searchKeys')
      const selectedBikeJson = window.localStorage.getItem('selectedBike')

      if (selectedBikeJson) {
         console.log('selectedBikeJson ->', selectedBikeJson)
         const selectedBike = JSON.parse(selectedBikeJson)
         window.localStorage.removeItem('selectedBike')
         // deleteCookie('selectedBike')
         console.log('selectedBike ->', selectedBike)
         //  dispatch(searchKeysLoaded(searchKeys))
         //  console.log('selectedBike ->', selectedBike)
         selectedBike && dispatch(bikeSelected(selectedBike))
      }
   }

   // return () => window.localStorage.removeItem('selectedBike')
}, [loadedSegmentList])
*/
   const renderShowBikesButton = ({ size, type, range, className }) =>
      isFetchingBikes ? (
         <Button
            variant="reverse"
            className={cn(className)}

            //  disabled={!range}
            //type="submit"
         >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando...
         </Button>
      ) : (
         <Button
            variant="reverse"
            className={cn(className)}
            //   className={cn('bg-greenCorp text-black', className)}
            onClick={() => {
               dispatch(bikeSearchParamsSelected({ size, type, range }))

               //   setStep(3)
            }}
            disabled={!range}
            //type="submit"
         >
            <Search className="mr-2 h-4 w-4" />
            Mostrar bicicletas
         </Button>
      )

   const nextUrl = isAdmin
      ? `/dashboard/bookings/new/address?userId=${userId}`
      : '/booking/address'
   const prevUrl = isAdmin
      ? `/dashboard/bookings/new/date?userId=${userId}`
      : '/booking/date'

   const renderNextButton = (renderClassName) => {
      const isDisabled = !bikesQuantity

      return isDisabled ? (
         <Button disabled variant="custom" className={renderClassName}>
            Siguiente <ArrowRight weight="bold" className="ml-2 h-4 w-4" />
         </Button>
      ) : (
         <Button asChild variant="custom" className={renderClassName}>
            <Link href={nextUrl}>
               Siguiente <ArrowRight weight="bold" className="ml-2 h-4 w-4" />
            </Link>
         </Button>
      )
   }

   const renderPrevButton = (renderClassName) => (
      <Button asChild variant="custom" className={renderClassName}>
         <Link href={prevUrl}>
            {' '}
            <ArrowLeft weight="bold" className="mr-2 h-4 w-4" />
            Atrás{' '}
         </Link>
      </Button>
   )

   const handleSelect = (bike) => (ev) => {
      ////console.log('bike ->', bike)
      dispatch(bikeSelected(bike))
      // setStep(1)
   }
   return (
      <div>
         <BikeFiltersForm
            //loadedData={loadedData}
            loadedSearchKeys={searchKeys}
            isLoadingSizes={isLoadingSizes}
            availableSizes={availableSizes}
            segmentList={segmentList}
            dateRange={dateRange}
            disabled={true}
            renderShowBikesButton={renderShowBikesButton}
            renderPrevButton={renderPrevButton}
         />
         <StepControls
            renderNextButton={renderNextButton}
            renderPrevButton={renderPrevButton}
         />
         {/*isFetchingBikes ? (
            <div>
               LOADING availableBikes EN @@@ USER AvailableBikeListStep @@@
            </div>
         ) : availableBikes ? (
            <div className="bg-[RGB(243,240,243)]">
               {availableBikes.map((bike, idx) => (
                  <div>
                     <BikeCard bike={bike} />
                     <Separator className="holi my-4" />
                  </div>
               ))}
            </div>
         ) : (
            <div>NADA AUN</div>
         )*/}
      </div>
   )
}
