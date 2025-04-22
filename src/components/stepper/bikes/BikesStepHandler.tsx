// @ts-nocheck
'use client'
import {
   useGetAvailableRangesMutation,
   useGetAvailableSizesQuery,
   useLazyGetAvailableTypesQuery,
} from '@/lib/redux/apiSlices/bikeApi'
import {
   bikeSearchParamsDeleted,
   bikeSearchParamsSelected,
   bikeSelected,
   dateRangeSelected,
   segmentListLoaded,
   selectBikesByUnits,
   selectBikeSearchParams,
   selectDateRange,
   selectSegmentList,
} from '@/lib/redux/slices/bookingFormSlice'
import {
   dateRangeISOStringObjToString,
   stringDateRangeToISOStringObj,
} from '@/utils/datesFns/dateUtils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLazyDeleteCookieQuery } from '@/lib/redux/apiSlices/cookieApi'
// clave import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

import useCheckDatedStepper from '@/hooks/useCheckDatedStepper'
import { useRouter } from 'next/navigation'
import BikesStep from './BikesStep'

export default function BikesStepHandler({
   setStep,
   segmentList,
   loadedSearchKeys: searchKeys,
   isAdmin,
   userId,
   loadedData,
   isLogged,
   ...props
}) {
   useCheckDatedStepper({ userId, isAdmin })
   const dispatch = useDispatch()
   const router = useRouter()
   const [deleteCookie] = useLazyDeleteCookieQuery()

   const dateRange = useSelector(selectDateRange)
   //const dateRange = dateRangeISOStringObjToString(strDateRangeObj)
   const { from, to } = dateRange
   const isDateRange = !!from && !!to

   const bikeSearchParams = useSelector(selectBikeSearchParams)
   const bikesByUnits = useSelector(selectBikesByUnits)
   const bikesQuantity = bikesByUnits.length

   const loadedSegmentList = useSelector(selectSegmentList)

   /**
    * Si tengo los datos del formulario previos, no hago la petición
    */
   const {
      data: {
         data: { availableSizes },
      },
      isLoading: isLoadingSizes,
      isSuccess: isSuccessSizes,
   } = useGetAvailableSizesQuery({ dateRange }, { skip: !!loadedData })
   //TODO: mostrar error en cliente/navegador o ui
   const typesQuery = useLazyGetAvailableTypesQuery()

   const rangesMutation = useGetAvailableRangesMutation()

   /* Uso la mutation en lugar de la query porque la query no tiene reset
   const [
      triggerRange,
      { data, isFetching: isLoadingRange, originalArgs },
      lastPromiseInfoRanges,
   ] = useLazyGetAvailableRangesQuery()
    */

   const [isDisabled, setIsDisabled] = useState(true)

   const handleDisabled = (newKeys) => {}

   const dispatchBikeSearchParamsSelected = ({ size, type, range }) =>
      dispatch(bikeSearchParamsSelected({ size, type, range }))

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
      if (searchKeys) {
         const { dateRange, size, type, range } = searchKeys
         dispatch(dateRangeSelected(stringDateRangeToISOStringObj(dateRange)))
         dispatchBikeSearchParamsSelected({ size, type, range })
         deleteCookie('searchKeys')
         const selectedBikeJson = window.localStorage.getItem('selectedBike')
         //necesito que se hayan cargado los segmentos para poder seleccionar la bicicleta
         //(funcion addBikeToCart)
         if (selectedBikeJson && isLoadedSegmentList && isLogged) {
            const selectedBike = JSON.parse(selectedBikeJson)
            window.localStorage.removeItem('selectedBike')
            selectedBike && dispatch(bikeSelected(selectedBike))
         }
      }

      //Al desmontar el componente, elimino los ultimos datos de búsqueda de bicicletas
      return () => dispatch(bikeSearchParamsDeleted())
   }, [loadedSegmentList])

   const nextUrl = isAdmin
      ? `/dashboard/bookings/new/address?userId=${userId}`
      : '/booking/address'
   const prevUrl = isAdmin
      ? `/dashboard/bookings/new/date?userId=${userId}`
      : '/booking/date'

   return (
      <BikesStep
         bikesQuantity={bikesQuantity}
         prevUrl={prevUrl}
         nextUrl={nextUrl}
         onDispatch={dispatchBikeSearchParamsSelected}
         dateRange={dateRange}
         availableSizes={availableSizes}
         segmentList={segmentList}
         loadedSearchKeys={searchKeys}
         /** */
         rangesMutation={rangesMutation}
         typesQuery={typesQuery}
      />
   )
}
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
