// @ts-nocheck
//import { getAvailableSizesInRange } from '@/lib/pg-promise/crud/bikes'
import { NextResponse } from 'next/server'

import { findBookingById, updateBookingState } from '@/lib/pg/repos/booking'

export async function GET(req, { params }) {
   //console.log('params en API @-> ', params)
   const searchParams = req.nextUrl.searchParams
   const withBikes = searchParams.get('bikes')
   const { bookingId } = params
   //console.log('dateRange en API @-> ', dateRange)
   //  '[2023-10-04T22:00:00.000Z,2023-10-31T22:59:59.999Z]'
   return await findBookingById({ bookingId })

   // return await getAvailableSizesInRange(dateRange)
}

export async function PATCH(req, { params }) {
   const { bookingId } = params
   const body = await req.json()
   const { newState } = body
   try {
      const res = await updateBookingState({ bookingId, newState })
      return Response.json(res, { status: 201 })
   } catch (error) {
      console.log('### ERROR CRUD updateBookingState -> ', error)
      return Response.json({ error }, { status: 500 })
   }

   // return await getAvailableSizesInRange(dateRange)
}
