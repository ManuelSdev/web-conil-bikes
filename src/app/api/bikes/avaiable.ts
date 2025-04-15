// @ts-nocheck
import { query } from '@/src/lib/pg/db'

const setText = (dateRange, size, range, type) => `
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
),
SelectedBikeModels AS (
  SELECT
    model_id,
    model_name,
    model_type,
    model_range,
    model_brand,
    model_description,
    model_images 
  FROM
    model
  WHERE
    model_range = '${range}'
    AND model_type = '${type}'
)
SELECT
    count(bike_sn)::int count,
    bike_size AS "bikeSize",
    model_id AS "modelId",
    model_name AS "modelName",
    model_type AS "modelType",
    model_range AS "modelRange",
    model_brand AS "modelBrand",
    model_description AS "modelDesc",
    model_images AS "modelImages"
FROM
  AvailableBikes
  INNER JOIN SelectedBikeModels USING (model_id)
GROUP BY
    "modelId",
    "bikeSize",
    "modelName",
    "modelType",
    "modelRange",
    "modelBrand",
    "modelDesc",
    "modelImages"
  
`

export default async function handler(req, res) {
   // //console.log('==========', req.query)
   const { from, to, size, range, type } = req.query
   const dateRange = `${from},${to}`
   const text = setText(dateRange, size, range, type)
   try {
      const { rows } = await query(text)
      //console.log('------------', rows)
      res.status(201).json(rows)
   } catch (err) {
      //console.log('ERROR API AVAIABLE BIKES', err.message)
      //todo pon algo más
      res.status(500)
   }
}
