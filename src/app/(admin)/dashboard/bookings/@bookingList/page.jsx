import BookingList from '@/components/table/BookingList'
import { getBookingOnDate } from '@/lib/pg/crud/bookings'
//import { getBookingOnDate } from '@/lib/pg-promise/crud/bookings'
import React from 'react'

export default async function BookingListPage({ params, searchParams }) {
   const { date: encodedDate } = searchParams
   const date = encodedDate ? decodeURIComponent(encodedDate) : null
   if (!date) return null
   const res = date ? await getBookingOnDate(date) : null

   const bookings = date ? await res.json() : { bookings: null }
   console.log('bookings -> ', bookings)
   return <BookingList bookings={bookings} urlDate={encodedDate} />
}
