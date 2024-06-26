'use client'

import Link from 'next/link'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransitionLink } from '@/components/common/TransitionLink'

export const columns = [
   {
      accessorKey: 'bikes',
      header: ({ column }) => {
         return (
            <Button
               className="pl-0"
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Bicicletas
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: 'email',
      header: 'Usuario',
   },
   {
      accessorKey: 'state',
      header: 'Estado',
   },
   {
      accessorKey: 'pickup',
      header: 'Entrega',
   },
   {
      accessorKey: 'delivery',
      header: 'Devolución',
   },

   {
      id: 'action',
      cell: ({ row }) => {
         const { bookingId, date } = row.original
         //  console.log('row -> ', row)
         /**
          * row contiene la propiedad "original" que es el objeto que
          * se le pasa a la tabla para la fila correspondiente
          */
         return (
            <TransitionLink
               href={`/dashboard/bookings/${bookingId}/details`}
               className="text-indigo-600 hover:text-indigo-900"
            >
               Ver
               <span className="sr-only">, {bookingId}</span>
            </TransitionLink>
         )
      },
   },
]
