// @ts-nocheck
import { query } from '@/src/lib/pg/db'

const setText = (dateRange) => `
SELECT DISTINCT
  bike_size
FROM
  bike
WHERE
  bike_sn IN (
    SELECT
      bike_sn
    FROM
      bike
    WHERE
      bike_sn NOT IN (
        SELECT
          bike_sn
        FROM
          booking_order
        WHERE
          booking_id IN (
            SELECT
              booking_id
            FROM
              booking
            WHERE
             booking_state != 'cancelled' AND  '[${dateRange}]'::tstzrange && booking_date_range)))
    ORDER BY
      bike_size ASC;
  `

export default async function handler(req, res) {
   const { from, to } = req.query
   const dateRange = `${from},${to}`
   const text = setText(dateRange)
   try {
      const { rows } = await query(text, 'array')
      ////console.log('test----------------', rows)
      const availableSizes = rows.flatMap((r) => r)
      res.status(201).json(availableSizes)
   } catch (err) {
      //console.log('ERROR API AVAIABLE SIZES', err.message)
      res.status(500)
   }
}
