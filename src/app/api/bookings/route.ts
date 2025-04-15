// @ts-nocheck
import { createBooking } from '@/lib/pg/crud/bookings'

export async function POST(req) {
   //console.log('req.body -------->', req.method)
   const body = await req.json()
   const {
      adminId,
      bikes,
      userId,
      isAdmin,
      dateRange,
      address,
      price,
      email,
      delivery,
      pickup,
      duration,
   } = body
   return await createBooking(body)
}
