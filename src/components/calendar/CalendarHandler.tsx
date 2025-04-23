// @ts-nocheck
'use client'

import React, { useEffect, useState } from 'react'
import { es, tr } from 'date-fns/locale'
import CustomCalendar from './CustomCalendar'
import { serializeDateRange } from '@/utils/datesFns/dateUtils'
import CustomCaptionLabel from './CustomCaptionLabel'
import CustomRow from './CustomRow'
import CustomDay from './CustomDay'
import { useRouter } from 'next/navigation'
import { useGetBookingDatesInRangeQuery } from '@/lib/redux/apiSlices/bookingApi'

const urlParams = (obj) => new URLSearchParams(obj)

export default function CalendarHandler({ bookingDates: initialBookingDates }) {
   //console.log('initialBookingDates en CalendarHandler -> ',      initialBookingDates   )
   const router = useRouter()
   const [bookingDates, setBookingDates] = React.useState(initialBookingDates)
   console.log('bookingDates en CalendarHandler -> ', bookingDates)
   const [dateRange, setDateRange] = useState('')

   const handleSelect = (date) => {
      router.push(`/dashboard/bookings/list/${date.toISOString()}`)
   }
   const handleDateRange = (displayMonth) => {
      const dateRange = serializeDateRange({
         // @ts-ignore
         fromDate: displayMonth,
         outsideDates: true,
      })
      setDateRange(dateRange)
      // refetch()
   }

   //console.log('dateRange en CalendarHandler -> ', dateRange)
   //console.log('bookingDates en CalendarHandler -> ', bookingDates)

   const {
      data: bookingDatesOnMonth,
      isLoading,
      isSuccess,
      refetch,
      isFetching,
      originalArgs,
   } = useGetBookingDatesInRangeQuery(dateRange, {
      skip,
      // refetchOnMountOrArgChange: true
   })
   //console.log('data -> ', bookingDatesOnMonth)

   useEffect(() => {
      dateRange && refetch()
      bookingDatesOnMonth && setBookingDates(bookingDatesOnMonth)
   }, [dateRange, bookingDatesOnMonth])

   const handleMonthChange = (displayMonth) => handleDateRange(displayMonth)
   return (
      // @ts-ignore
      <CustomCalendar
         locale={es}
         mode="single"
         // selected={date}
         onSelect={handleSelect}
         showOutsideDays={true}
         //   className="rounded-md border"
         onMonthChange={handleMonthChange}
         //disabled={disabledDays}
         // useDayRender={customDayRender}
         components={{
            Day: CustomDay,
            // CaptionLabel: CustomCaptionLabel
            // Row: CustomRow,
         }}
         bookingDates={bookingDates}
         isLoading={isFetching}
         //  toDate={(o) =>//console.log(o}

         //modifiers={{ booked: bookedDays }}
         //modifiersClassNames={{booked: 'bg-red-700', selected: 'bg-green-700',}}
      />
   )
}

/*
const today = set(new Date(), {
   hours: 0,
   minutes: 0,
   seconds: 0,
   milliseconds: 0,
})
const startMonth = startOfMonth(today)
console.log('startMonth ->', startMonth)

const monthStartWeek = startOfWeek(startMonth)
const monthStartWeekEs = startOfWeek(startMonth, { locale: es })
const monthStartISOWeek = startOfISOWeek(startMonth)
console.log('monthStartWeek ->', monthStartWeek)
console.log('monthStartWeek toISOString ->', monthStartWeek.toISOString())
console.log('monthStartWeekEs ->', monthStartWeekEs)
console.log('monthStartISOWeek ->', monthStartISOWeek)

// último dia del mes a la última hora
const endMonth = endOfMonth(today)
//ultimo día del mes a las 00:00 horas
const lastDayMonth = lastDayOfMonth(today)
console.log('endMonth ->', endMonth)
console.log('lastDayMonth ->', lastDayMonth)

//penúltimo día de la ultima semana del mes a la útlima hora
console.log('//////////////////// endMonth ////////////////////')
const monthEndWeek = endOfWeek(endMonth)
const monthEndWeekEs = endOfWeek(endMonth, { locale: es })
const monthEndISOWeek = endOfISOWeek(endMonth)
console.log('monthEndWeek ->', monthEndWeek)
console.log('monthEndWeekEs ->', monthEndWeekEs)
console.log('monthEndISOWeek ->', monthEndISOWeek)
console.log('monthEndWeek toISOString ->', monthEndWeek.toISOString())

console.log('//////////////////// lastDayMonth ////////////////////')
const lastDayInLastWeek = endOfWeek(lastDayMonth)
const lastDayInLastWeekEs = endOfWeek(lastDayMonth, { locale: es })
const lastDayInLastWeekISO = endOfISOWeek(lastDayMonth)
console.log('lastDayInLastWeek ->', lastDayInLastWeek)
console.log('lastDayInLastWeekEs ->', lastDayInLastWeekEs)
console.log('lastDayInLastWeekISO ->', lastDayInLastWeekISO)
console.log('lastDayInLastWeek toISOString ->', lastDayInLastWeek.toISOString())
*/

/*
   const monthChangeHandler = async (displayMonth) => {
      const dateRange = serializeDateRange({
         fromDate: displayMonth,
         outsideDates: true,
      })
     //console.log('monthChangeHandler dateRange ---------------> ', dateRange)
      try {
         //   //console.log('== LANZA FETCH ==')
         //TODO: cambiar URL para producción
         //TODO: revisa eso de method: 'GET'
         const res = await fetch(
            //  process.env.URL + `/api?${urlParams(dateRange)}, {method: 'GET'}`
            `../api?${urlParams({ dateRange })}`
         )
         const { bookingDates } = await res.json()
        //console.log(
            'bookingDatesInRange en monthChangeHandler ---------------> ',
            bookingDates
         )
         setBookingDates(bookingDates)
      } catch (error) {
        //console.log('monthChangeHandler error -> ', error)
      }
   }
   */
