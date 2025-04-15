// @ts-nocheck
import { query } from '@/src/lib/pg/db'

const setText = (dateRange, size) => `
WITH AvailableBikes AS (
  SELECT DISTINCT
    bike_size,
    model_id
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
              booking_state != 'cancelled' AND '[${dateRange}]'::tstzrange && booking_date_range)))
          AND bike_size = '${size}'
        ORDER BY
          bike_size ASC
)
    SELECT DISTINCT
      model_type
    FROM
      AvailableBikes
      INNER JOIN model USING (model_id);
`

export default async function handler(req, res) {
   const { from, to, size } = req.query
   const dateRange = `${from},${to}`
   const text = setText(dateRange, size)
   try {
      const { rows } = await query(text, 'array')
      const availableTypes = rows.flatMap((r) => r)
      res.status(201).json(availableTypes)
   } catch (err) {
      //console.log('ERROR API AVAIABLE TYPES', err.message)
      res.status(500)
   }
}
