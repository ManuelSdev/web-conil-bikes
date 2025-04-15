// @ts-nocheck
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
//La fecha de entrada es el primer día del mes o null
//TODO: mira la opcion metiendo locale cuando pruebes otros idiomas
export function createDateRangeString({
   fromDate = null,
   toDate = null,
   outsideDates = false,
}) {
   const createDateRangeString = (fromDate) =>
      pipe(
         fromDateToDateRangeObj(outsideDates),
         dateRangeObjToISOStringObj,
         dateRangeISOStringObjToString
      )(fromDate)

   const convertDateRangeToString = ({ from, to }) =>
      //console.log('=========== pipe from > ', from) ||
      pipe(
         dateRangeObjToISOStringObj,
         dateRangeISOStringObjToString
      )({ from, to })

   const dateRangeString =
      fromDate && toDate
         ? convertDateRangeToString({ from: fromDate, to: toDate })
         : createDateRangeString(fromDate)

   return dateRangeString
}

function fromDateToDateRangeObj(outsideDates) {
   return (from) => {
      const today = set(new Date(), {
         hours: 0,
         minutes: 0,
         seconds: 0,
         milliseconds: 0,
      })
      ////console.log('FROM QUE ENTRA EN fromDateToDateRangeObj -> ', from)
      const startMonth = from ? startOfMonth(from) : startOfMonth(today)
      const endMonth = from ? endOfMonth(from) : endOfMonth(today)

      if (!outsideDates) {
         const dateRanges = from
            ? { from: from, to: addMonths(from, 1) }
            : { from: today, to: endOfMonth(today) }
         const dateRange = { from: startMonth, to: endMonth }
         ////console.log(' setDateRange -> ', dateRange)
         ////console.log(' setDateRangesssssssssss -> ', dateRanges.to.toISOString())
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
   //console.log('dateRangeObjToISOStringObj -> ', dateRangeObj)
   const { from, to } = dateRangeObj
   //console.log('from @-> ', from)
   ////console.log('to @-> ', to)
   return {
      from: from ? from.toISOString() : '',
      to: to ? to.toISOString() : '',
   }
}

export function dateRangeISOStrObjToDateRangeObj({ from, to }) {
   //console.log('dateRangeISOStrObjToDateRangeObj -> ', { from, to })
   return {
      from: from ? new Date(from) : '',
      to: to ? new Date(to) : '',
   }
}
export function dateRangeISOStringObjToString({ from, to }) {
   return `[${from},${to}]`
}
/**
 *
 * @param {string} strDateRange - format  '[2023-11-06T23:00:00.000Z,2023-11-16T23:00:00.000Z]'
 * @returns {object} - { from: Date, to: Date
 */
export const stringDateRangeToDateRangeObj = (strDateRange) => {
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
/*
const today = set(new Date(), {
   hours: 0,
   minutes: 0,
   seconds: 0,
   milliseconds: 0,
})
//primer día del mes a las 00:00 horas
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
//Los dos que siguen pillan ultimo dia ultima hora
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
