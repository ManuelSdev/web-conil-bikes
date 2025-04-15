// @ts-nocheck
import pool, { query } from '../db'
import { addBookingText } from '../textSql/bookings/addBooking'
import {
   txtFindBookingBikesById,
   txtFindBookingById,
   txtFindBookingByUserId,
   txtFindBookingDatesInRange,
   txtFindBookingOnDate,
   txtFindBookingOnDateWithEmail,
   txtUpdateBookingState,
} from './bookingText'

export const findBookingDatesInRange = async (dateRange) => {
   //console.log('dateRange en findBookingDatesInRange -> ', dateRange)
   const text = 'SELECT * FROM find_booking_dates_in_range($1)'
   const values = [dateRange]
   const rowMode = 'array'

   const {
      rows: [bookingDates],
   } = await query({ text: txtFindBookingDatesInRange, values })
   //console.log('bookingDates en findBookingDatesInRange -> ', bookingDates)
   bookingDates.startdates ??= []
   bookingDates.enddates ??= []
   bookingDates.startenddates ??= []
   const {
      startdates: startDates,
      enddates: endDates,
      startenddates: startEndDates,
   } = bookingDates
   // console.log('bookingDates en findBookingDatesInRange -> ', bookingDates)
   return { startDates, endDates, startEndDates }
}

export const findBookingOnDate = async (date) => {
   //console.log('date en findBookingOnDate -> ', date)
   //const text = 'SELECT * FROM find_booking_on_date($1)'
   const text = txtFindBookingOnDate

   const values = [date]
   const rowMode = 'array'
   const { rows } = await query({ text, values })
   //array de objetos

   return rows
}
export const findBookingOnDateWithEmail = async (date) => {
   //console.log('date en findBookingOnDate -> ', date)
   //const text = 'SELECT * FROM find_booking_on_date($1)'
   const text = txtFindBookingOnDateWithEmail

   const values = [date]
   const rowMode = 'array'
   const { rows } = await query({ text, values })
   //array de objetos

   return rows
}
export const findBookingById = async (bookingId) => {
   //  const text = 'SELECT * FROM find_booking_by_id($1)'
   const text = txtFindBookingById
   const values = [bookingId]
   const rowMode = 'array'
   const {
      rows: [booking],
   } = await query({ text, values })
   booking.dateRange = JSON.parse(booking.dateRange)
   //console.log('booking en findBookingById -> ', booking)
   return booking
}
export const findBookingByUserId = async (userId) => {
   //console.log('date en findBookingOnDate -> ', date)
   //const text = 'SELECT * FROM find_booking_on_date($1)'
   const text = txtFindBookingByUserId

   const values = [userId]
   const rowMode = 'array'
   const { rows } = await query({ text, values })
   //array de objetos

   return rows
}
export const findBookingBikesById = async (bookingId) => {
   //  const text = 'SELECT * FROM find_booking_bikes_by_id($1)'
   const text = txtFindBookingBikesById
   const values = [bookingId]
   const rowMode = 'array'
   const { rows: bikes } = await query({ text, values })
   //array de objetos
   //console.log('rows en findBookingBikesById -> ', bikes)
   return bikes
}

export const addBooking = async (data) => {
   const text = addBookingText(data)
   //console.log('text en addBooking', text)
   const client = await pool.connect()
   try {
      await client.query('BEGIN')
      //console.log('@@@@@@@@@@@+++++++ query text en addBooking', text)
      const { rows } = await client.query(text)
      await client.query('COMMIT')
      const [{ bookingId }] = rows
      return { bookingId }
      //  const [{ booking_id: bookingId }] = rows
      //console.log('@@@@@@@@@@@+++++++ response en addBooking', rows)
      res.status(201).json(bookingId)
   } catch (err) {
      await client.query('ROLLBACK')
      //console.log('ERROR API CREATE BOOKING', err.message)
      throw err
      res.status(500)
   } finally {
      //console.log('============ FINALLY ================')
      client.release()
   }
}
/** PATCH **/

export const updateBookingState = async ({ bookingId, newState }) => {
   //  const text = 'SELECT * FROM find_booking_bikes_by_id($1)'
   const text = txtUpdateBookingState
   const values = [bookingId, newState]
   const rowMode = 'array'
   const res = await query({ text, values })
   //array de objetos
   //console.log('rows en findBookingBikesById -> ', bikes)
   return res
}
/** */

export const addBooking_ = async ({
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
}) => {
   const jsonBikes = JSON.stringify(bikes)
   const strJsonBikes = `${jsonBikes}`
   //console.log('strJsonBikes en addBooking -> ', strJsonBikes)
   const text =
      'CALL add_booking($1::text, $2::INTEGER, $3::BOOLEAN, $4::tstzrange, $5::TEXT, $6::SMALLINT, $7::TEXT, $8::BOOLEAN, $9::BOOLEAN,$10::SMALLINT, null)'
   const values = [
      strJsonBikes,
      userId,
      isAdmin,
      dateRange,
      address,
      price,
      email,
      delivery,
      pickup,
      duration,
   ]

   const rowMode = 'array'

   const res = await query({ text, values })
   //console.log('res en addBooking @@@-> ', res)
   const { rows } = res
   //console.log('rows en addBooking @@@@-> ', rows)
   return rows
}

const a = {
   'bikes': [{ 'modelId': 25, 'bikeSize': 'm', 'quantity': 1 }],
   'userId': 1,
   'isAdmin': true,
   'dateRange': '[2023-11-09T23:00:00.000Z,2023-11-21T23:00:00.000Z]',
   'address': 'C/ Santa Lucia (Los molinos) 55',
   'price': 12,
   'email': 'vivaperrita@gmail.com',
   'delivery': false,
   'pickup': false,
   'duration': 43,
}
