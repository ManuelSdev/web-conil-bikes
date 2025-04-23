// @ts-nocheck
import {
   addMonths,
   endOfISOWeek,
   endOfMonth,
   endOfWeek,
   lastDayOfMonth,
   set,
   startOfISOWeek,
   startOfMonth,
   startOfWeek,
} from 'date-fns'

import { es } from 'date-fns/locale'
import { pipe } from '../functions'

/**
 * @description Función que crea un string con un rango de fechas en formato ISO: '[from,to]'
 * Si no se le pasa ningún parámetro, devuelve el rango de fechas del mes actual
 * @param {Date} fromDate - objeto Date con la fecha de inicio del rango
 * @returns {string} - string con el rango de fechas en formato ISO: '[from,to]'
 */
export function serializeDateRange({
   fromDate = null,
   toDate = null,
   outsideDates = false,
}) {
   const serializeDateRange = (fromDate) =>
      pipe(
         fromDateToDateRangeObj(outsideDates),
         dateRangeObjToISOStringObj,
         serializeDateRangeISOString
      )(fromDate)

   const convertDateRangeToString = ({ from, to }) =>
      pipe(
         dateRangeObjToISOStringObj,
         serializeDateRangeISOString
      )({ from, to })

   const dateRangeString =
      fromDate && toDate
         ? convertDateRangeToString({ from: fromDate, to: toDate })
         : serializeDateRange(fromDate)

   return dateRangeString
}

export function fromDateToDateRangeObj(outsideDates) {
   return (from) => {
      const today = set(new Date(), {
         hours: 0,
         minutes: 0,
         seconds: 0,
         milliseconds: 0,
      })
      const startMonth = from ? startOfMonth(from) : startOfMonth(today)
      const endMonth = from ? endOfMonth(from) : endOfMonth(today)

      if (!outsideDates) {
         const dateRanges = from
            ? { from: from, to: addMonths(from, 1) }
            : { from: today, to: endOfMonth(today) }
         const dateRange = { from: startMonth, to: endMonth }
         return dateRange
      }
      if (outsideDates) {
         const monthStartWeek = startOfWeek(startMonth)
         const monthEndWeek = endOfISOWeek(endMonth)
         const dateRange = { from: monthStartWeek, to: monthEndWeek }

         return dateRange
      }
   }
}

export function dateRangeObjToISOStringObj(dateRangeObj) {
   const { from, to } = dateRangeObj
   return {
      from: from ? from.toISOString() : '',
      to: to ? to.toISOString() : '',
   }
}

export function dateRangeISOStrObjToDateRangeObj({ from, to }) {
   return {
      from: from ? new Date(from) : '',
      to: to ? new Date(to) : '',
   }
}

export function serializeDateRangeISOString({ from, to }) {
   return `[${from},${to}]`
}

/**
 *
 * @param {string} strDateRange - format  '[2023-11-06T23:00:00.000Z,2023-11-16T23:00:00.000Z]'
 * @returns {object} - { from: Date, to: Date }
 */
export const serializedDateRangeToDateRangeObj = (strDateRange) => {
   const dates = strDateRange.replace(/[\[\]']+/g, '').split(',')
   const from = new Date(dates[0])
   const to = new Date(dates[1])
   return { from, to }
}

export const stringDateRangeToISOStringObj = (strDateRange) => {
   const dates = strDateRange.replace(/[\[\]']+/g, '').split(',')
   const from = dates[0]
   const to = dates[1]
   return { from, to }
}
