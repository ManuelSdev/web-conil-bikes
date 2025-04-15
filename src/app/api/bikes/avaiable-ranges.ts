// @ts-nocheck
import { query } from '@/src/lib/pg/db'

const setText = (dateRange, size, type) => `
WITH AvailableBikes AS (
  SELECT DISTINCT
    bike_sn,
    bike_size,
    model_id
  FROM
    Bike
  WHERE
    bike_sn IN (
      SELECT
        bike_sn availableBikeSn
      FROM
        bike
      WHERE
        bike_sn NOT IN (
          SELECT
            bike_sn reservedBikeSn
          FROM
            booking_order
          WHERE
            booking_id IN (
              SELECT
                booking_id reservedId
              FROM
                Booking
              WHERE
              booking_state != 'cancelled' AND '[${dateRange}]'::tstzrange && booking_date_range)))
          AND bike_size = '${size}'
        ORDER BY
          bike_size ASC
)
    SELECT DISTINCT
      model_range
    FROM
      AvailableBikes
      INNER JOIN model USING (model_id)
  WHERE
    model_type = '${type}';
`

export default async function handler(req, res) {
   const { from, to, size, type } = req.query
   const dateRange = `${from},${to}`
   const text = setText(dateRange, size, type)
   try {
      const { rows } = await query(text, 'array')
      const availableRanges = rows.flatMap((r) => r)
      // //console.log('++++++++', availableRanges)
      res.status(201).json(availableRanges)
   } catch (err) {
      //console.log('ERROR API AVAIABLE RANGES', err.message)
      res.status(500)
   }
}
