// @ts-nocheck
import 'server-only'

import { NextResponse } from 'next/server'

import { dbErrorResponse } from '@/app/api/utils'
import getOrderResumeEmail from '@/lib/react-email/orderResume'
import sendGridSendEmail from '@/lib/sendGrid/sendEmail'
import { serializeDateRangeISOString } from '@/utils/datesFns/dateUtils'
import {
   addBooking,
   findBookingBikesById,
   findBookingById,
   findBookingDatesInRange,
   findBookingOnDate,
} from '../repos/booking'
//TODO: meter try catch en todas las funciones
//TODO: usar caché next.js y separar la lógica de la API de la logica de las server functions
export async function getBookingDatesInRange(dateRange) {
   console.log('dateRange en getBookingDatesInRange -> ', dateRange)
   const bookings = await findBookingDatesInRange(dateRange)
   //console.log('bookings en getBookingDatesInRange -> ', bookings)
   return NextResponse.json(bookings, { status: 201 })
}

export async function getBookingOnDate(dateRange) {
   console.log('dateRange en getBookingOnDate ####-> ', dateRange)
   const bookingDates = await findBookingOnDate(dateRange)
   console.log('bookingDates en getBookingOnDate -> ', bookingDates)
   return NextResponse.json(bookingDates, { status: 201 })
}

export async function getBookingById(bookingId) {
   const bookings = await findBookingById(bookingId)
   return NextResponse.json(bookings, { status: 201 })
}

export async function getBookingBikesById(bookingId) {
   const bookingBikes = await findBookingBikesById(bookingId)
   return NextResponse.json(bookingBikes, { status: 201 })
}

export async function getBookingWithBikesById(bookingId) {
   const booking = await findBookingById(bookingId)
   console.log('booking en getBookingWithBikesById -> ', booking)
   const bookingBikes = await findBookingBikesById(bookingId)
   return NextResponse.json(
      { bookingData: booking, bikes: bookingBikes },
      { status: 201 }
   )
}

export async function createBooking(data) {
   const strDateRange = serializeDateRangeISOString(data.dateRange)
   const addBookingData = { ...data, dateRange: strDateRange }
   try {
      const { bookingId } = await addBooking(addBookingData)
      console.log(
         'Reserva creada en createBooking con Id de reserva -> ',
         bookingId
      )

      const html = getOrderResumeEmail({
         ...data,
         bookingId,
      })
      const to = data.email
      const subject = 'Resumen de tu reserva en Conil Bikes'
      const sendResult = await sendGridSendEmail({ to, subject, html })

      return NextResponse.json(
         { succes: true, data: { bookingId } },
         { status: 201 }
      )
   } catch (error) {
      return dbErrorResponse(error)
   }

   //
}
/*
export async function createBooking_({
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
}) 

{
  //console.log('params en createBooking -> ', {
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
   })


   try {
      //  const db = client()
     //console.log('@@ CRUD FN createBooking @@')
      const createdBookingId = await addBooking({
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
      })
     //console.log('createdBookingId en createBooking-> ', createdBookingId)
      return NextResponse.json(createdBookingId, { status: 201 })
   } catch (error) {
     //console.log('### ERROR CRUD api/createBooking -> ', error)
   }
}
*/
