// @ts-nocheck
'use client'

import { AlertDialogButton } from '@/components/common/AlertDialogButton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { bikeSelected } from '@/lib/redux/slices/bookingFormSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import BikeCard from './BikeCard'
//import useAka from '@/lib/redux/apiSlices/bikesApiHooks/useAka'

export default function AvailableBikeList({
   isLogged,
   loadedAvailableBikes,
   bikesToShow,
   handleSelection,
   ...props
}) {
   const router = useRouter()

   const dispatch = useDispatch()

   const handleSelect = (bike) => (ev) => {
      dispatch(bikeSelected(bike))
   }

   const handleDialogAction = (bike) => {
      handleSelection(bike)
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
   if (bikesToShow)
      return (
         <div className="bg-[RGB(243,240,243)]">
            {bikesToShow.map((bike, idx) => (
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
}
