// @ts-nocheck
import pool from '@/src/lib/pg/db'

/**
 * OBTIENE RESERVAS ACTIVAS EN FECHA SELECCIONADA:
 * -Busco los id dentro del rango de fechas de la tabla booking
 * -Devuelvo as *matchedBookingId
 * OBTIENE Las BICICLETAS QUE INCLUYEN ESAS RESERVAS ACTIVAS
 * -Busco los bikeSn de los *matchedBookingId   en la tabla bookingOrder
 * -Devuelvo as *matchedBikeSn
 * OBTIENE TODAS LAS BICICLETAS EXCEPTO LAS INCLUIDAS EN RESERVAS ACTIVAS
 * -Busco los size que no son *matchedBikeSn en la tabla bike
 * -Eliminio duplicados
 * -Devuelvo as *availableSizes
 *
 */

/**
 * Pilla las sizes de Bike
 * - sn esta en BookingOrder
 * - su bookingId tiene las fechas del rango
 */

const text = (dateRange) => `
WITH AvailableBikes AS (
  SELECT
    bikeSn,
    bikeSize,
    bikeModelName
  FROM
    Bike
  WHERE
    bikeSn IN (
      SELECT
        bikeSn availableBikeSn
      FROM
        bike
      WHERE
        bikeSn NOT IN (
          SELECT
            bikeSn reservedBikeSn
          FROM
            BookingOrder
          WHERE
            bookingId IN (
              SELECT
                /*Devuelve tabla con una columna bookingId con
                 alias reservedId que contiene con los ids que
                 cumplen el WHERE*/
                bookingId reservedId
              FROM
                Booking
              WHERE
                /*DONDE el rango dado se superpone en algún día
                 con algunos de los rangos que contiene la columna
                 tzdate de la tabla Booking*/
                '[${dateRange}]'::tstzrange && bookingDateRange)))
        ORDER BY
          bikeSize ASC
)
    SELECT distinct
      bikeSize
    FROM
      AvailableBikes
      INNER JOIN BikeModel ON AvailableBikes.bikeModelName = BikeModel.bikeModelName
      ORDER BY
      bikeSize ASC
`

const query = (dateRange) => ({
   text: text(dateRange),
   rowMode: 'array',
})

export async function getSizes(filters) {
   return 'availableBikesSizes'
}

export default async function handler(req, res) {
   // const dateRange = req.query
   const { from, to } = req.query
   const strDateRange = `${from},${to}`
   //console.log('--------> ', strDateRange)
   try {
      await pool.connect()
      const { rows } = await pool.query(query(strDateRange))
      //await getSizes(date)
      console.log(
         'SQL---------',
         rows.flatMap((r) => r)
      )
      res.status(201).json(rows)
   } catch (err) {
      //console.log('ERROR BIKES GET', err.message)
      res.status(500)
   }
}

/*
db.hotels.find({
    $and: [
        {
            bookings: {
                $elemMatch: {

                    $or: [
                        { from: { $gte: to_date } },
                        { to: { $lte: from_date } }
                    ]

                }
            }
        },
        {
            bookings: {
                $not: {
                    $elemMatch: {

                        $or: [
                            { from: { $gte: from_date, $lte: to_date } },
                            { to: { $lte: to_date, $gte: from_date } }
                        ]

                    }
                }
            }
        }]
})

*/
