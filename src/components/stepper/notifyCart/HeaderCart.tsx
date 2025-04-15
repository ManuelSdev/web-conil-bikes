// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'

import useDialogWindow from '@/components/common/useDialogWindow'
import {
   selectBikesByUnits,
   selectBookingAddress,
   selectDateRange,
} from '@/lib/redux/slices/bookingFormSlice'
import { useSelector } from 'react-redux'
import SelectedBikesListHandler from './SelectedBikesListHandler'
import { cn } from '@/utils/functions'

import Link from 'next/link'
import { format } from 'date-fns'
import { MoveRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import DrawerMenu from '@/components/drawer/DrawerMenu'
import { Separator } from '@/components/ui/separator'

import NotifyBadgeSpanSr from '../notifyBadge/NotifyBadgeSpanSr'
import NotifyBadgeNumber from '../notifyBadge/NotifyBadgeNumber'
import NotifyBadge from '../notifyBadge/NotifyBadge'

export default function HeaderCart({ userId, isLogged }) {
   const { dialog, handleSetDialog } = useDialogWindow(null)

   const dateRange = useSelector(selectDateRange)

   const { from, to } = dateRange

   //console.log('from', from)
   const bikesByUnits = useSelector(selectBikesByUnits)

   const bikesQuantity = bikesByUnits.length

   const address = useSelector(selectBookingAddress)

   const [currentPage, setCurrentPage] = useState('')

   const [isInitialRender, setIsInitialRender] = useState(true)

   const pathname = usePathname()

   const isDashboard = pathname.includes('dashboard')

   console.log('pathname', pathname.includes('dashboard'))

   const isComplete = !!from && !!to && !!bikesQuantity && !!address

   const text = isComplete ? 'Ir a la cesta' : 'Continuar'

   const page = checkPath(pathname)

   function checkString(str) {
      const regex = /\/hola(?!\/)/
      return regex.test(str)
   }

   function checkPath(path) {
      const patterns = {
         date: /\/date(?!\/)/,
         bikes: /\/bikes(?!\/)/,
         address: /\/address(?!\/)/,
         resume: /\/resume(?!\/)/,
      }

      for (const [key, regex] of Object.entries(patterns)) {
         if (regex.test(path)) {
            return key
         }
      }

      return false
   }

   const nextPage = isComplete
      ? '/booking/resume'
      : page === 'date'
        ? '/booking/bikes'
        : page === 'bikes'
          ? '/booking/address'
          : '/booking/resume'

   const next = isComplete
      ? '/booking/resume'
      : page === 'date' && !!address
        ? '/booking/bikes'
        : page === 'bikes' && !!bikesQuantity
          ? '/booking/address'
          : '/booking/resume'

   const textTo = isComplete
      ? 'Ir al carrito'
      : page === 'date' && !!address
        ? 'Continuar'
        : page === 'bikes' && !!bikesQuantity
          ? 'Continuar'
          : 'Ir al carrito'

   const aaa = page === 'bikes' ? 'Continuar' : 'Ir al carrito'

   console.log('=============================', page)
   console.log('==========sssss======', currentPage)
   const dashboardNextPage = isComplete
      ? `/dashboard/bookings/new/resume?userId=${userId}`
      : page === 'date'
        ? `/dashboard/bookings/new/bikes?userId=${userId}`
        : page === 'bikes'
          ? `/dashboard/bookings/new/address?userId=${userId}`
          : `/dashboard/bookings/new/resume?userId=${userId}`

   useEffect(() => {
      if (isInitialRender) {
         handleSetDialog({ open: false })
         setIsInitialRender(false)
         return
      }

      if (bikesQuantity) {
         //  setCurrentBikes(bikesQuantity)
         console.log('opennnnnn')
         handleSetDialog({ open: true })
      }
      if (!bikesQuantity) {
         // setCurrentBikes(bikesQuantity)
         console.log('opennnnnn')
         handleSetDialog({ open: false })
      }

      //  return () => handleSetDialog({ open: false })
      // setCurrentBikes(bikesQuantity)
      return () => console.log('unmount')
   }, [bikesQuantity])

   return (
      <div
         className={cn({
            // 'fixed bottom-2 right-2': true,
            //'hidden': !bikesQuantity,
         })}
      >
         <NotifyBadge
            disabled={!bikesQuantity}
            className={
               'border-greenCorp text-greenCorp h-12 w-12 border-none bg-inherit'
            }
            onClick={() => handleSetDialog({ open: true })}
         >
            <ShoppingCart />
            <NotifyBadgeSpanSr />
            <NotifyBadgeNumber
               className={
                  'border-greenCorp text-greenCorp top-0 right-0 bg-black'
               }
            >
               {bikesQuantity}
            </NotifyBadgeNumber>
         </NotifyBadge>
         <DrawerMenu
            sheetTitle={'Mi reserva'}
            content={
               <div>
                  {from && to && (
                     <div className="flex justify-evenly py-5">
                        <div>{format(new Date(from), 'dd/MM/yyyy')}</div>
                        <MoveRight />
                        <div>{format(new Date(to), 'dd/MM/yyyy')}</div>
                     </div>
                  )}
                  <Separator />

                  <SelectedBikesListHandler />
                  <Separator />

                  <div className="mx-auto flex max-w-xs flex-col gap-5 pt-5">
                     {
                        <Button
                           asChild
                           className="text-greenCorp"
                           onClick={() => handleSetDialog({ open: false })}
                        >
                           <Link href={next}>{textTo}</Link>
                        </Button>
                     }
                     <Button
                        className="text-greenCorp"
                        onClick={() => handleSetDialog({ open: false })}
                     >
                        {page === 'bikes' ? 'Añadir bicicletas' : 'Cerrar'}
                     </Button>
                  </div>
               </div>
            }
            side={'right'}
            {...dialog}
         />
      </div>
   )
}
