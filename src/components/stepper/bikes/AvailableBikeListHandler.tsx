// @ts-nocheck
'use client'

import useLazyGetAvailableBikesQueryHook from '@/lib/redux/apiSlices/bikesApiHooks/useLazyGetAvailableBikesQueryHook'
import { useLazyCreateCookieQuery } from '@/lib/redux/apiSlices/cookieApi'
import {
   selectBikeSearchParams,
   selectDateRange,
} from '@/lib/redux/slices/bookingFormSlice'
import { serializeDateRangeISOString } from '@/utils/datesFns/dateUtils'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import AvailableBikeList from './AvailableBikeList'
//import useAka from '@/lib/redux/apiSlices/bikesApiHooks/useAka'

export default function AvailableBikeListHandler({
   isLogged,
   loadedAvailableBikes,
   ...props
}) {
   //console.log('AvailableBikeListUserHandler @@@->')
   const storedDateRange = useSelector(selectDateRange)
   const dateRange = serializeDateRangeISOString(storedDateRange)
   const bikeSearchParams = useSelector(selectBikeSearchParams)

   const router = useRouter()

   const [triggerCookie] = useLazyCreateCookieQuery()

   const dispatch = useDispatch()
   //TODO quita esto y mete aquí el hook si no lo usas en ninguna parte
   const { availableBikes, isFetchingBikes, isSuccessBikes } =
      useLazyGetAvailableBikesQueryHook()

   const bikesToShow = loadedAvailableBikes || availableBikes
   console.log('bikesToShow ->>>', loadedAvailableBikes)
   /**
    * Si el usuario no está logueado, guardo la selección de la bici en local storage
    * y los parámetros de búsqueda y la url en cookies
    * Esto permite que, tras el login y la redirección, el formulario de búsqueda de bicicletas
    * se rellene con los datos que se habían introducido antes de hacer login
    *
    */
   const setSelectionBeforeLogin = (bike) => {
      const searchKeys = { dateRange, ...bikeSearchParams }
      const searchKeysCookieValue = JSON.stringify(searchKeys)
      const selectedBikeCookieValue = JSON.stringify(bike)
      const byteSize = (str) => new Blob([str]).size
      window.localStorage.setItem('selectedBike', selectedBikeCookieValue)
      triggerCookie({ name: 'searchKeys', value: searchKeysCookieValue })
      triggerCookie({ name: 'resolvedUrl', value: '/booking/bikes' })
   }
   return (
      <AvailableBikeList
         bikesToShow={bikesToShow}
         isLogged={isLogged}
         handleSelection={setSelectionBeforeLogin}
         {...props}
      />
   )
}
