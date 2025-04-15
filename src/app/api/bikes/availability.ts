// @ts-nocheck
//import 'server-only'

import { query } from '@/lib/pg/db'

const setTexto = (dateRange, size, range, type) => `
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
                '[${dateRange}]'::tstzrange && booking_date_range)))
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
const setText = (dateRange, reservedBikes, bookingId) => {
   let andOrText = ''
   reservedBikes.forEach((bike, index) => {
      andOrText =
         andOrText +
         `(bike_size='${bike.bikeSize}' AND model_id=${bike.modelId}) ${
            index + 1 === reservedBikes.length ? '' : 'OR '
         }`
   })
   const text = `
   WITH IDS AS (
    SELECT
      BOOKING_ID
    FROM
      BOOKING
    WHERE
    booking_state != 'cancelled' AND booking_id != ${bookingId}  AND '[${dateRange}]'::tstzrange && BOOKING_DATE_RANGE
  ),
  BIKE_SN_RESERVED_IN_RANGE AS (
    SELECT
      BIKE_SN
    FROM
      BOOKING_ORDER
    WHERE
      BOOKING_ID IN (
        SELECT
          BOOKING_ID
        FROM
          IDS)),
  COUNT_EACH_MODEL_ID_AND_BIKE_SIZE_RESERVED AS (SELECT
    MODEL_ID,
    BIKE_SIZE,
    COUNT(MODEL_ID) reserved
  FROM
    BIKE
  WHERE
    BIKE_SN IN (
      SELECT
        BIKE_SN
      FROM
        BIKE_SN_RESERVED_IN_RANGE)
    AND (${andOrText})
    GROUP BY
      MODEL_ID,
      BIKE_SIZE),
BIKE_STOCK AS (
  SELECT
    MODEL_ID,
    BIKE_SIZE,
    COUNT(MODEL_ID) STOCK
  FROM
    BIKE
  WHERE (${andOrText})
GROUP BY
  MODEL_ID,
  BIKE_SIZE
ORDER BY
  MODEL_ID ASC,
  BIKE_SIZE ASC
)     
SELECT
  model_id AS "modelId",
  bike_size As "bikeSize",
  reserved ::int,
  stock ::int,
  (stock - reserved) ::int AS "availability"
FROM
  COUNT_EACH_MODEL_ID_AND_BIKE_SIZE_RESERVED
  NATURAL JOIN bike_stock    
   `
   return text
}
export async function fn(req, res) {
   const { from, to, reservedBikes, bookingId } = req.body
   const dateRange = `${from},${to}`
   const text = setText(dateRange, reservedBikes, bookingId)
   // const client = await pool.connect()
   try {
      // await client.query('BEGIN')
      //console.log('@@@@@@@@@@@+++++++', text)
      const { rows } = await query(text)
      // await client.query('COMMIT')
      //console.log('@@@@@@@@@@@+++++++', rows)
      res.status(201).json(rows)
   } catch (err) {
      // await client.query('ROLLBACK')
      //console.log('ERROR API AVAIABILITY--^^', err.message)
      res.status(500)
   }
}
export default async function handler(req, res) {
   // //console.log('==========', req.query)

   fn(req, res)
}
