/**
 * Alias que indica que la cadena ISO siempre proviene de `.toISOString()`
 */
export type DateISOString = string

/**
 * Representa un rango de fechas en formato Date estándar.
 */
export type DateRange = { from: Date; to: Date }

/**
 * Representa un rango de fechas en formato ISO 8601.
 * Este tipo es el resultado de aplicar `.toISOString()` a un `DateRange`.
 */
export type DateRangeISOString = { from: DateISOString; to: DateISOString }

/**
 * Representa un rango de fechas serializado en formato string.
 * El rango sigue la estructura: '[YYYY-MM-DDTHH:mm:ss.sssZ,YYYY-MM-DDTHH:mm:ss.sssZ]'
 * Las fechas dentro del rango están en formato ISO 8601 generado por `.toISOString()`.
 */
export type SerializedDateRange = `[${string},${string}]`
