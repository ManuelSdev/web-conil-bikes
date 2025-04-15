// @ts-nocheck
export const txtFindBookingDatesInRange = `WITH dates AS (
    SELECT
      LOWER(booking_date_range) startDate,
      UPPER(booking_date_range) endDate
    FROM
      BOOKING
    WHERE
      $1::tstzrange && booking_date_range
  ),
  startDates AS (
    SELECT
      startDate
    FROM
      dates
    WHERE
      $1::tstzrange @> startDate
  ),
  endDates AS (
    SELECT
      endDate
    FROM
      dates
    WHERE
      $1::tstzrange @> endDate
  ),
  startEndDates AS (
    SELECT
      startDate startEndDate
    FROM (
      SELECT
        *
      FROM
        startDates
      CROSS JOIN endDates) AS CROSSING
  WHERE
    startDate = endDate
  ),
  cleanStart AS (
    SELECT
      startDate
    FROM
      startDates
    WHERE
      startDate NOT IN (
        SELECT
          startEndDate
        FROM
          startEndDates)
  ),
  cleanEnd AS (
    SELECT
      endDate
    FROM
      endDates
    WHERE
      endDate NOT IN (
        SELECT
          startEndDate
        FROM
          startEndDates)
  ),
  cleanStartArray AS (
    SELECT
      ARRAY_AGG(startDate) startDates
    FROM
      cleanStart
  ),
  cleanEndArray AS (
    SELECT
      ARRAY_AGG(endDate) endDates
    FROM
      cleanEnd
  ),
  startEndArray AS (
    SELECT
      ARRAY_AGG(startEndDate) startEndDates
    FROM
      startEndDates
  )
  SELECT
    *
  FROM
    cleanStartArray,
    cleanEndArray,
    startEndArray
    `
export const txtFindBookingOnDate = `
WITH asBooking AS (
  SELECT
    booking_id,
    booking_state,
    booking_delivery,
    booking_pickup
  FROM
    BOOKING
  WHERE
    $1::timestamp WITH TIME ZONE = LOWER(booking_date_range)
    OR $1::timestamp WITH TIME ZONE = UPPER(booking_date_range)
),
asOrder AS (
  SELECT
    booking_id,
    COUNT(booking_id)::int BIKES
  FROM
    booking_order
  GROUP BY
    booking_id
)
SELECT
  booking_id AS "bookingId",
  booking_state AS state,
  booking_delivery AS delivery,
  booking_pickup AS pickup,
  bikes
FROM
  asBooking
  INNER JOIN asOrder USING (booking_id);
  `
export const txtFindBookingByUserId = `
  WITH asBooking AS (
    SELECT
      booking_id,
      booking_state,
      booking_delivery,
      booking_pickup,
      booking_price
    FROM
      BOOKING
    WHERE
      user_id = $1
  ),
  asOrder AS (
    SELECT
      booking_id,
      COUNT(booking_id)::int BIKES
    FROM
      booking_order
    GROUP BY
      booking_id
  )
  SELECT
    booking_id AS "bookingId",
    booking_state AS state,
    booking_delivery AS delivery,
    booking_pickup AS pickup,
    booking_price AS price,
    bikes
  FROM
    asBooking
    INNER JOIN asOrder USING (booking_id);
    `
export const txtFindBookingOnDateWithEmail = `
  WITH asBooking AS (
    SELECT
      booking_id,
      booking_state,
      booking_delivery,
      booking_pickup,
      user_email
    FROM
      booking b INNER JOIN app_user u ON b.user_id = u.user_id
    WHERE
      $1::timestamp WITH TIME ZONE = LOWER(booking_date_range)
      OR $1::timestamp WITH TIME ZONE = UPPER(booking_date_range)
  ),
  asOrder AS (
    SELECT
      booking_id,
      COUNT(booking_id)::int BIKES
    FROM
      booking_order
    GROUP BY
      booking_id
  )
  SELECT
    booking_id AS "bookingId",
    booking_state AS state,
    booking_delivery AS delivery,
    booking_pickup AS pickup,
    bikes,
    user_email AS email
  FROM
    asBooking
    INNER JOIN asOrder USING (booking_id);
    `

export const txtFindBookingById = `
  WITH bookingData AS (
   SELECT
     *
   FROM
     BOOKING
   WHERE
     booking_id = $1
  ),
  userData AS (
   SELECT
     *
   FROM
     app_user
   WHERE
     user_email IN (
       SELECT
         user_email
       FROM
         bookingData))
  SELECT
   user_email AS "email",
   booking_price AS "price",
   booking_date_range AS "dateRange",
   booking_duration AS "duration",
   booking_delivery AS "delivery",
   booking_pickup AS "pickup",
   booking_address AS "address",
   booking_state AS "state",
   booking_id AS "bookingId",
   user_name AS "name",
   user_phone AS "phone"
  FROM
   bookingData
   NATURAL JOIN userdata
  `
export const txtFindBookingBikesById = `
WITH asOrder AS (
 SELECT
   bike_sn,
   pedal_model_name AS pedal,
   basket
 FROM
   booking_order
 WHERE
   booking_id = $1),
   asBikes AS (
     SELECT
       bike_sn,
       model_id,
       bike_size
     FROM
       BIKE
     WHERE
       bike_sn IN (
         SELECT
           bike_sn
         FROM
           asOrder)),
       asModel AS (
         SELECT
           model_id,
           model_name,
           model_type,
           model_range,
           model_brand,
           model_images
         FROM
           model
         WHERE
           model_id IN (
             SELECT
               model_id
             FROM
               asBikes))
           SELECT
             model_id AS "modelId",
             bike_sn AS "bikeSn",
             pedal,
             basket,
             bike_size AS "bikeSize",
             model_name AS "modelName",
             model_type AS "modelType",
             model_range AS "modelRange",
             model_brand AS "modelBrand",
             model_images AS "modelImages"
           FROM
             asOrder
           NATURAL JOIN asBikes
           NATURAL JOIN asModel;
`
/** PATCH **/

export const txtUpdateBookingState = `
UPDATE
   booking
SET
   booking_state = $2
WHERE
   booking_id = $1;
`
