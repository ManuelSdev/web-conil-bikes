// @ts-nocheck
//import { getAvailableSizesInRange } from '@/lib/pg-promise/crud/bikes'

import { getBookingBikesById } from '@/lib/pg/crud/bookings'
import { findBookingById } from '@/lib/pg/repos/booking'

export async function GET(req, { params }) {
   //console.log('params en API @-> ', params)
   // const searchParams = req.nextUrl.searchParams
   //const withBikes = searchParams.get('bikes')
   const { bookingId } = params
   //console.log('dateRange en API @-> ', dateRange)
   //  '[2023-10-04T22:00:00.000Z,2023-10-31T22:59:59.999Z]'
   return await getBookingBikesById({ bookingId })

   // return await getAvailableSizesInRange(dateRange)
}
