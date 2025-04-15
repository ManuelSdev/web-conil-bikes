// @ts-nocheck
'use client'

import React from 'react'

import clsx from 'clsx'
import {
   compareAsc,
   endOfMonth,
   isSameDay,
   isSameMonth as isSameMonthFns,
   startOfMonth,
} from 'date-fns'

import {
   Button,
   // DateRange,
   DayPicker,
   // DayProps,
   useDayPicker,
   useDayRender,
} from 'react-day-picker'
import { cn } from '@/utils/functions'

/**
 * @description Componente para renderizar un día en el calendario.
 * El componente DayPicker renderiza un componente Day por cada día del mes que se está mostrando.
 * @param {object} props - Las props que recibe desde el componente DayPicker
 * Incluye TODOS los classNames que has creado
 * @param {Date} props.date - La fecha del día que se está renderizando
 * @param {Date} props.displayMonth - Fecha del primer día del mes que se está mostrando en el calendario
 * @returns {JSX.Element}
 */

export default function CustomDay({ date, displayMonth, ...props }) {
   const buttonRef = React.useRef(null)
   const dayRender = useDayRender(date, displayMonth, buttonRef)
   // @ts-ignore
   //Contiene todas las props que recibe el componente DayPicker
   const dayPicker = useDayPicker()
   // @ts-ignore
   const { bookingDates, isLoading } = dayPicker
   if (dayRender.isHidden) {
      return <></>
   }
   if (!dayRender.isButton) {
      return <div {...dayRender.divProps} />
   }
   //console.log('bookingDates -> ', bookingDates)
   ////console.log('date -> ', date)

   const isSameMonth = isSameMonthFns(date, displayMonth)
   //Si la primera fecha es anterior a la segunda, devuelve -1. Si son iguales, devuelve 0. Si la primera fecha es posterior a la segunda, devuelve 1.
   const isPast = compareAsc(date, new Date()) === -1
   const isSameMonthPast = isSameMonth && isPast
   const isDisabled = isDateDisabled({
      date,
      bookingDatesOnMonth: bookingDates,
   })
   const bookingDay = !isDisabled
   const createCustomProps = (classNamesObj) => ({
      ...dayRender.buttonProps,
      // isDisabled: true,
      className: cn(dayRender.buttonProps.className, {
         ...classNamesObj,
      }),
   })

   const bookedClassName = calendarCellClass({
      date,
      bookingDatesOnMonth: bookingDates,
   })
   const customProps = {
      ...dayRender.buttonProps,
      //   isDisabled: true,
      className: cn(dayRender.buttonProps.className, {
         //   'bg-red-100': isDisabled,
         //    'text-red-500': isSameMonthPast,
         'text-gray-400': !isSameMonth,
         'text-gray-500': isSameMonthPast,
         //Le quita cualquier color de fondo que tenga
         'hover:bg-inherit': isDisabled,
         // @ts-ignore
         //'bg-sky-400'
         [bookedClassName]: true,
         //TODO: descomenta para animar
         // 'text-inherit animate-pulse bg-slate-200': isLoading,
         //    'hover:bg-red-500': true,
      }),
   }
   return (
      <Button
         // class="bg-red-500"
         name="customDay"
         {...customProps}
         ref={buttonRef}
         //    onClick={handleClick}
         disabled={isDisabled}
      />
   )
}

function calendarCellClass({ date, bookingDatesOnMonth }) {
   //console.log('day en CustomPickersDay -> ', date)
   if (!bookingDatesOnMonth) return ''
   const { startDates, endDates, startEndDates } = bookingDatesOnMonth
   //TODO revisa ese rounded-full
   const commonClasses = 'text-white hover:text-black rounded-full'

   const classNames = {
      startDates: clsx('bg-sky-400', commonClasses),
      endDates: clsx('bg-fuchsia-400', commonClasses),
      startEndDates: clsx(
         'hover:from-inherit [&:not(hover)]:bg-gradient-to-r [&:not(hover)]:from-sky-400 [&:not(hover)]:from-50% [&:not(hover)]:to-fuchsia-400 [&:not(hover)]:to-50%',
         commonClasses
      ),
   }
   /*
   Rulla igual
         startEndDates: clsx(
         '[&:not(:hover)]:[background:_linear-gradient(90deg,#ff0000_50%,_#00ff00_50%)]',
         commonClasses
      ),

  startEndDates: clsx(
         //  'bg-gradient-to-r from-sky-400 from-50% to-fuchsia-400 to-50%',
         'bg-red-500',
         commonClasses
      ),
   */
   const keyNames = ['startDates', 'endDates', 'startEndDates']

   //Si la date a renderizar coincide con alguna de las fechas de una de las listas de fechas de reserva que contiene
   //el objeto bookingDatesOnMonth, devuelve el className correspondiente a esa lista de fechas. Si no coincide con ninguna
   //fecha de ninguna lista, devuelve un string vacío '' que filter pilla como falsy y no lo devuelve
   const assignClassNamesIfMatch = ({ bookingDateList, className }) =>
      bookingDateList.reduce((acc, bookingDate) => {
         const matchedDay = new Date(bookingDate)
         if (isSameDay(date, matchedDay)) {
            return className
         } else return acc
      }, '')

   const getClassName = () => {
      const keysArray = Object.keys(bookingDatesOnMonth)
      // keysArray = ['startDates', 'endDates', 'startEndDates']
      // devuelve lista de 3 elementos: un className válido y dos strings vacios ''
      const classNameList = keysArray.map((key) =>
         assignClassNamesIfMatch({
            bookingDateList: bookingDatesOnMonth[key],
            className: classNames[key],
         })
      )
      // Filtra los strings vacios '' y devuelve un array con el className valido
      const [className] = classNameList.filter((className) => className)
      return className
   }
   const className = getClassName()

   return className
}

function isDateDisabled({ date, bookingDatesOnMonth }) {
   // //console.log('bookingDatesOnMonth s->', bookingDatesOnMonth)
   const { startDates, endDates, startEndDates } = bookingDatesOnMonth
   // //console.log('startDates s->', startDates)
   const fromDays = startDates.filter((startDate) =>
      isSameDay(date, new Date(startDate))
   )
   const toDays = endDates.filter((endDate) =>
      isSameDay(date, new Date(endDate))
   )
   const dualDays = startEndDates.filter((dualDate) =>
      isSameDay(date, new Date(dualDate))
   )
   // //console.log("++++++++++", f);
   //  //console.log("----------", t);
   if (fromDays.length !== 0 || toDays.length !== 0 || dualDays.length !== 0) {
      return false
   } else return true
}
