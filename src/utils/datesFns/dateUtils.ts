import {
   addMonths,
   endOfISOWeek,
   endOfMonth,
   set,
   startOfMonth,
   startOfWeek,
} from 'date-fns'

import { pipe } from '../functions'
import {
   DateRangeISOString,
   DateRange,
   SerializedDateRange,
} from '@/types/dateTypes'

/**
 * Convierte un rango de fechas a formato ISO en string para consultas SQL.
 * El resultado sigue el formato: '[YYYY-MM-DDTHH:MM:SS.sssZ,YYYY-MM-DDTHH:MM:SS.sssZ]'.
 *
 * @param {Date | null} fromDate - Fecha de inicio del rango (opcional). Si solo se proporciona `fromDate`, se convierte
 * esta fecha a formato ISO y se genera un rango basado en ella, utilizando una lógica interna específica.
 * @param {Date | null} toDate - Fecha de fin del rango (opcional).
 * @param {boolean} outsideDates - Si se debe incluir fechas fuera del rango mensual.
 *
 * @returns {SerializedDateRange} - Rango en formato ISO para PostgreSQL.
 *
 * @example
 * serializeDateRange({ fromDate: new Date('2023-11-01'), toDate: new Date('2023-11-30') });
 * // Devuelve: '[2023-11-01T00:00:00.000Z,2023-11-30T23:59:59.999Z]'
 *
 * serializeDateRange({ fromDate: new Date('2023-11-01') });
 * // Devuelve: '[2023-11-01T00:00:00.000Z,2023-11-07T23:59:59.999Z]' (rango generado a partir de `fromDate`)
 */
export function serializeDateRangeObj({
   fromDate,
   toDate,
   outsideDates,
}: {
   fromDate?: Date | null
   toDate?: Date | null
   outsideDates?: boolean
}): SerializedDateRange {
   const createAndSerialize = (fromDate?: Date): SerializedDateRange =>
      pipe(
         fromDateToDateRangeObj(outsideDates),
         dateRangeObjToISOStringObj,
         serializeDateRangeISOString
      )(fromDate)

   const serialize = ({ from, to }: DateRange): SerializedDateRange =>
      pipe(
         dateRangeObjToISOStringObj,
         serializeDateRangeISOString
      )({ from, to })

   return fromDate && toDate
      ? serialize({ from: fromDate, to: toDate })
      : createAndSerialize(fromDate as Date)
}

/**
 * Genera un rango de fechas basado en una fecha de inicio y una configuración opcional.
 * Si `outsideDates` es `true`, expande el rango para incluir semanas completas.
 *
 * @param {boolean} outsideDates - Indica si se deben incluir días fuera del mes.
 * @returns {(from?: Date) => DateRange} - Función que calcula el rango basado en la fecha de inicio.
 *
 * @example
 * const range = fromDateToDateRangeObj(true)(new Date('2023-11-01'));
 * console.log(range);
 * // Devuelve: { from: Date('2023-11-01T00:00:00.000Z'), to: Date('2023-11-07T23:59:59.999Z') }
 */
//CLAVE: esto lo podrías anular : (from?: Date) => DateRange porque ya se tipificó en
// la segunda función, pero es util en funciones complejas
// lo dejo porque no deja de tipificar el tipo de retorno de la función principal
function fromDateToDateRangeObj(
   outsideDates?: boolean
): (from?: Date) => DateRange {
   return (from?: Date): DateRange => {
      // Normaliza la fecha actual, eliminando horas y minutos.
      const today = set(new Date(), {
         hours: 0,
         minutes: 0,
         seconds: 0,
         milliseconds: 0,
      })

      // Obtiene el inicio y fin del mes de la fecha proporcionada o del día actual.
      const startMonth = from ? startOfMonth(from) : startOfMonth(today)
      const endMonth = from ? endOfMonth(from) : endOfMonth(today)

      if (!outsideDates) {
         // Si no se deben incluir días fuera del mes, devuelve el rango estándar.
         return from
            ? { from, to: addMonths(from, 1) }
            : { from: today, to: endMonth }
      }

      // Si se deben incluir días fuera del mes, expande el rango hasta las semanas completas.
      const monthStartWeek = startOfWeek(startMonth)
      const monthEndWeek = endOfISOWeek(endMonth)

      return { from: monthStartWeek, to: monthEndWeek }
   }
}

/**
 * Convierte un objeto `DateRange` a su versión en formato ISO 8601.
 *
 * @param {DateRange} dateRangeObj - Objeto con `Date` en las propiedades `from` y `to`.
 * @returns {DateRangeISOString} - Rango convertido a formato ISO.
 *
 * @note
 * Aunque el operador `!` (`dateRangeObj.from!.toISOString()`) podría forzar a TypeScript a asumir que `from` y `to` nunca son `undefined`,
 * esta implementación opta por `?? ''` para manejar posibles valores nulos o indefinidos de forma más segura.
 *
 * @example
 * const dateRange = { from: new Date('2023-11-01'), to: new Date('2023-11-30') };
 * const isoRange = dateRangeObjToISOStringObj(dateRange);
 * console.log(isoRange);
 * // Devuelve: { from: '2023-11-01T00:00:00.000Z', to: '2023-11-30T23:59:59.999Z' }
 */
export function dateRangeObjToISOStringObj(
   dateRangeObj: DateRange
): DateRangeISOString {
   return {
      from: dateRangeObj.from?.toISOString() ?? '', // Se usa `?? ''` para manejar posibles valores undefined de forma segura
      to: dateRangeObj.to?.toISOString() ?? '', // En lugar de `!`, se prioriza una opción más robusta
   }
}

/**
 * Convierte un objeto `DateRangeISOString`, con fechas en formato ISO 8601, a un objeto `DateRange` con valores
 * de tipo/formato objeto `Date`.
 *
 * @param {DateRangeISOString} dateRangeISO - Objeto con fechas en formato string (`from` y `to`).
 * @returns {DateRange} - Objeto con fechas convertidas a `Date`.
 *
 * @example
 * const isoRange = { from: '2023-11-01T00:00:00.000Z', to: '2023-11-30T23:59:59.999Z' };
 * const range = dateRangeISOStrObjToDateRangeObj(isoRange);
 * console.log(range);
 * // Devuelve: { from: new Date('2023-11-01T00:00:00.000Z'), to: new Date('2023-11-30T23:59:59.999Z') }
 */
export function dateRangeISOStrObjToDateRangeObj({
   from,
   to,
}: DateRangeISOString): DateRange {
   return {
      from: new Date(from),
      to: new Date(to),
   }
}

/**
 * Convierte un objeto `DateRangeISOString` a su versión en string `[from,to]`.
 *
 * @param {DateRangeISOString} param0 - Objeto con fechas en formato ISO.
 * @returns {SerializedDateRange} - Formato `[from,to]` listo para enviar en queries SQL.
 *
 * @example
 * const isoRange = { from: '2023-11-01T00:00:00.000Z', to: '2023-11-30T23:59:59.999Z' };
 * const rangeStr = serializeDateRangeISOString(isoRange);
 * console.log(rangeStr);
 * // Devuelve: '[2023-11-01T00:00:00.000Z,2023-11-30T23:59:59.999Z]'
 */
export function serializeDateRangeISOString({
   from,
   to,
}: DateRangeISOString): SerializedDateRange {
   return `[${from},${to}]`
}

/**
 * Convierte un string con rango de fechas en formato ISO (`[from,to]`) a un objeto `DateRange` con valores `Date`.
 *
 * @param {SerializedDateRange} strDateRange - Cadena con fechas en formato '[YYYY-MM-DDTHH:MM:SS.sssZ,YYYY-MM-DDTHH:MM:SS.sssZ]'.
 * @returns {DateRange} - Objeto con fechas convertidas a `Date`.
 *
 * @example
 * const strRange = '[2023-11-01T00:00:00.000Z,2023-11-30T23:59:59.999Z]';
 * const range = serializedDateRangeToDateRangeObj(strRange);
 * console.log(range);
 * // Devuelve: { from: new Date('2023-11-01T00:00:00.000Z'), to: new Date('2023-11-30T23:59:59.999Z') }
 */
export const serializedDateRangeToDateRangeObj = (
   strDateRange: SerializedDateRange
): DateRange => {
   const dates = strDateRange.replace(/[\[\]']+/g, '').split(',')
   return {
      from: new Date(dates[0]),
      to: new Date(dates[1]),
   }
}

/**
 * Convierte un string con rango de fechas en formato ISO (`[from,to]`) a un objeto `DateRangeISOString`.
 *
 * @param {SerializedDateRange} strDateRange - Cadena con fechas en formato '[YYYY-MM-DDTHH:MM:SS.sssZ,YYYY-MM-DDTHH:MM:SS.sssZ]'.
 * @returns {DateRangeISOString} - Objeto con fechas en formato string (`from` y `to`).
 *
 * @example
 * const strRange = '[2023-11-01T00:00:00.000Z,2023-11-30T23:59:59.999Z]';
 * const isoRange = stringDateRangeToISOStringObj(strRange);
 * console.log(isoRange);
 * // Devuelve: { from: '2023-11-01T00:00:00.000Z', to: '2023-11-30T23:59:59.999Z' }
 */
export const stringDateRangeToISOStringObj = (
   strDateRange: SerializedDateRange
): DateRangeISOString => {
   const dates = strDateRange.replace(/[\[\]']+/g, '').split(',')
   return {
      from: dates[0],
      to: dates[1],
   }
}
