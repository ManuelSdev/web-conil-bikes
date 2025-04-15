// @ts-nocheck
'use client'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
   bikeSelected,
   selectBikeSearchParams,
   selectDateRange,
} from '@/lib/redux/slices/bookingFormSlice'
import { Button } from '@/components/ui/button'
import { dateRangeISOStringObjToString } from '@/utils/datesFns/createDateRangeString'
import BikeCard from './BikeCard'
import { Separator } from '@/components/ui/separator'
import { AlertDialogButton } from '@/components/common/AlertDialogButton'
import { useLazyCreateCookieQuery } from '@/lib/redux/apiSlices/cookieApi'
import { useRouter } from 'next/navigation'
import useLazyGetAvailableBikesQueryHook from '@/lib/redux/apiSlices/bikesApiHooks/useLazyGetAvailableBikesQueryHook'
import BikeCardSkeleton from './BikeCardSkeleton'
//import useAka from '@/lib/redux/apiSlices/bikesApiHooks/useAka'

export default function AvailableBikeListHandler({
   setStep,
   isLogged,
   loadedAvailableBikes,
   ...props
}) {
   //console.log('AvailableBikeListUserHandler @@@->')
   const storedDateRange = useSelector(selectDateRange)
   const dateRange = dateRangeISOStringObjToString(storedDateRange)
   const bikeSearchParams = useSelector(selectBikeSearchParams)

   const router = useRouter()

   const [triggerCookie] = useLazyCreateCookieQuery()

   const dispatch = useDispatch()

   const { availableBikes, isFetchingBikes, isSuccessBikes } =
      useLazyGetAvailableBikesQueryHook()

   const handleSelect = (bike) => (ev) => {
      // console.log('bike ->', bike)
      dispatch(bikeSelected(bike))
      // setStep(1)
   }

   const renderPrevButton = () => (
      <Button onClick={() => setStep(2)} className="text-greenCorp">
         atrás
      </Button>
   )

   const handleDialogAction = (bike) => {
      console.log('bike -------------------->', bike)
      console.log('bikeSearchParams -------------------->', bikeSearchParams)
      const searchKeys = { dateRange, ...bikeSearchParams }

      const searchKeyscookieValue = JSON.stringify(searchKeys)
      const selectedBikeCookieValue = JSON.stringify(bike)
      const byteSize = (str) => new Blob([str]).size
      console.log(
         'selectedBikeCookieValue ->',
         byteSize(selectedBikeCookieValue)
      )
      console.log('searchKeyscookieValue ->', selectedBikeCookieValue)
      // triggerCookie({ name: 'selectedBike', value: selectedBikeCookieValue })
      //Guarda la bicicleta seleccionada en el local storage para que la
      window.localStorage.setItem('selectedBike', selectedBikeCookieValue)
      triggerCookie({ name: 'searchKeys', value: searchKeyscookieValue })
      triggerCookie({ name: 'resolvedUrl', value: '/booking/bikes' })
      router.push(
         //`/user/booking?step=1b&date=${dateRange}&size=${size}&type=${type}&range=${range}`
         '/auth/sign-in'
      )
   }
   const renderSelectBikeButton = (bike) =>
      isLogged ? (
         <Button onClick={handleSelect(bike)}>Seleccionar</Button>
      ) : (
         <AlertDialogButton
            title={'Inicia sesión para reservar'}
            description={
               'Para gestionar una reserva, primero debes iniciar sesión. Pulsa el botón para acceder a la página de inicio de sesión, donde podrás acceder con tu cuenta o crear una nueva si aún no lo has hecho.'
            }
            actionText={'Iniciar sesión'}
            cancelText={'Cancelar'}
            triggerButtonText={'Seleccionar'}
            handleAction={(event) => handleDialogAction(bike)}
         />
      )
   const showBikes = (bikes) => (
      <div className="bg-[RGB(243,240,243)]">
         {bikes.map((bike, idx) => (
            // console.log('bikes -> ', bikes) ||
            <div key={idx}>
               <BikeCard
                  bike={bike}
                  renderSelectBikeButton={(bike) =>
                     renderSelectBikeButton(bike)
                  }
               />
               <Separator className="holi my-4" />
            </div>
         ))}
      </div>
   )
   /*
   useEffect(() => {
      const { size, type, range } = bikeSearchParams
      size && type && range && triggerBikes({ dateRange, ...bikeSearchParams })
   }, [bikeSearchParams])
*/
   //return <BikeCardSkeleton />
   //if (isFetchingBikes) return <BikeCardSkeleton />

   if (loadedAvailableBikes) return showBikes(loadedAvailableBikes)

   if (availableBikes) return showBikes(availableBikes)
   /*
   return isFetchingBikes ? (
      <div>LOADING availableBikes EN @@@ USER AvailableBikeListStep @@@</div>
   ) : loadedAvailableBikes ? (
      showBikes(loadedAvailableBikes)
   ) : availableBikes ? (
      showBikes(availableBikes)
   ) : (
      <div>NADA AUN</div>
   )
   */
}
