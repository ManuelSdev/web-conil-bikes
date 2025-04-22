// @ts-nocheck
'use client'

import React, { useEffect, useState } from 'react'
import { es, tr } from 'date-fns/locale'

import CustomCalendar from './CustomCalendar'

import { createDateRangeString } from '@/utils/datesFns/dateUtils'
import CustomCaptionLabel from './CustomCaptionLabel'
import CustomRow from './CustomRow'
import CustomDay from './CustomDay'
import { useRouter } from 'next/navigation'
import {
   useGetBookingDatesInRangeQuery,
   useLazyGetBookingDatesInRangeQuery,
} from '@/lib/redux/apiSlices/bookingApi'

const urlParams = (obj) => new URLSearchParams(obj)

export default function CalendarHandlerUrl({
   className,
   bookingDates: initialBookingDates,
}) {
   //console.log('CalendarHandlerUrl *************************')
   //console.log('initialBookingDates en CalendarHandler -> ', initialBookingDates  )
   const router = useRouter()

   const [bookingDates, setBookingDates] = React.useState(initialBookingDates)

   const [number, setNumber] = useState(0)

   const [dateRange, setDateRange] = useState('')

   const [getBookingDatesOnMonth, { data: bookingDatesOnMonth2 }] =
      useLazyGetBookingDatesInRangeQuery()

   const handleSelect = (selectedDay) => {
      const date = selectedDay.toISOString()
      // router.push(`/dashboard/bookings/${date.toISOString()}`)
      const params = urlParams({ date })
      // router.push(`/dashboard/bookings?${params}`)
      router.push(`/dashboard/bookings/calendar/${date}`)
   }
   const handeDateRange = async (displayMonth) => {
      //console.log('handeDateRange displayMonth -> ', displayMonth)
      const dateRange = createDateRangeString({
         // @ts-ignore
         fromDate: displayMonth,
         outsideDates: true,
      })
      setNumber(number + 1)
      const res = await getBookingDatesOnMonth(dateRange)
      //console.log('res -> ', res)
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
      skip: true,
      // refetchOnMountOrArgChange: true
   })

   //console.log('bookingDatesOnMonth -> ', bookingDatesOnMonth)
   /*
   useEffect(() => {
      dateRange && refetch()
      bookingDatesOnMonth && setBookingDates(bookingDatesOnMonth)
   }, [dateRange, bookingDatesOnMonth])
*/
   /*
   useEffect(() => {
      const getDates=async(dateRange)=>{
         const res= await getBookingDatesOnMonth(dateRange)
         return res
      }
      dateRange && getDates(dateRange)
      bookingDatesOnMonth && setBookingDates(bookingDatesOnMonth)
   }, [dateRange, bookingDatesOnMonth])
*/

   const handleMonthChange = (displayMonth) => handeDateRange(displayMonth)
   return (
      // @ts-ignore
      <div className={className}>
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
         <div>NUMBER: {number}</div>
      </div>
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
      const dateRange = createDateRangeString({
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
