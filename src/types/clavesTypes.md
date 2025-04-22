### Tipos en fechas

    - El picker del calendar suelta un objeto Date
    - Postgree pilla los rangos como tipos de datos como tstzrange (rangos de timestamps con zona horaria) , que son como un string con este formato
    '[2025-04-01T00:00:00Z,2025-04-21T23:59:59Z]'
    - dateRange en bookingFormSlice es así (objetos Date convertidos con meth toISOstring):
        export interface DateRange {
             from: string; // ISO 8601
             to: string;   // ISO 8601
        }
    - Por todo esto tengo las funciones de conversión...simplifica...
