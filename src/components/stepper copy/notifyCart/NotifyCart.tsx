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

export default function NotifyCart({ page, userId, isLogged }) {
   const { dialog, handleSetDialog } = useDialogWindow(null)
   const dateRange = useSelector(selectDateRange)
   const { from, to } = dateRange
   //console.log('from', from)
   const bikesByUnits = useSelector(selectBikesByUnits)
   const bikesQuantity = bikesByUnits.length
   const address = useSelector(selectBookingAddress)
   const [currentBikes, setCurrentBikes] = useState(0)
   const [isInitialRender, setIsInitialRender] = useState(true)
   const pathname = usePathname()
   const isDashboard = pathname.includes('dashboard')
   console.log('pathname', pathname.includes('dashboard'))
   const isComplete = !!from && !!to && !!bikesQuantity && !!address
   const text = isComplete ? 'Ir a la cesta' : 'Continuar'

   const nextPage = isComplete
      ? '/booking/resume'
      : page === 'date'
        ? '/booking/bikes'
        : page === 'bikes'
          ? '/booking/address'
          : '/booking/resume'

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
   }, [bikesQuantity])

   return (
      <div
         className={cn({
            'fixed right-2 bottom-2': true,
            'hidden': !bikesQuantity,
         })}
      >
         <NotifyBadge onClick={() => handleSetDialog({ open: true })}>
            <ShoppingCart />
            <NotifyBadgeSpanSr />
            <NotifyBadgeNumber>{bikesQuantity}</NotifyBadgeNumber>
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
                     {page !== 'address' ||
                        (page === 'adddress' && !!address && (
                           <Button asChild className="text-greenCorp">
                              <Link
                                 href={
                                    isDashboard ? dashboardNextPage : nextPage
                                 }
                              >
                                 {text}
                              </Link>
                           </Button>
                        ))}
                     {page !== 'address' ? (
                        <Button asChild className="text-greenCorp">
                           <Link
                              href={isDashboard ? dashboardNextPage : nextPage}
                           >
                              {text}
                           </Link>
                        </Button>
                     ) : (
                        !!address && (
                           <Button asChild className="text-greenCorp">
                              <Link
                                 href={
                                    isDashboard ? dashboardNextPage : nextPage
                                 }
                              >
                                 {text}
                              </Link>
                           </Button>
                        )
                     )}
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
