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
