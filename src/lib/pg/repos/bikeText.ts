// @ts-nocheck
export const txtFindAvailableSizesInRange = `
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
             booking_state != 'cancelled' AND  $1::tstzrange && booking_date_range)))
    ORDER BY
      bike_size ASC;
  `
export const txtFindAvailableTypes = `
WITH AvaiableBikes AS (
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
              booking_state != 'cancelled' AND $1::tstzrange && booking_date_range)))
          AND bike_size = $2
        ORDER BY
          bike_size ASC
)
    SELECT DISTINCT
      model_type
    FROM
      AvaiableBikes
      INNER JOIN model USING (model_id);
`
export const txtFindAvailableRanges = `
WITH AvaiableBikes AS (
  SELECT DISTINCT
    bike_sn,
    bike_size,
    model_id
  FROM
    Bike
  WHERE
    bike_sn IN (
      SELECT
        bike_sn avaiableBikeSn
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
              booking_state != 'cancelled' AND $1::tstzrange && booking_date_range)))
          AND bike_size = $2
        ORDER BY
          bike_size ASC
)
    SELECT DISTINCT
      model_range
    FROM
      AvaiableBikes
      INNER JOIN model USING (model_id)
  WHERE
    model_type = $3;
`
export const txtFindAvailableBikes = `
WITH AvaiableBikes AS (
  SELECT DISTINCT
    bike_sn,
    bike_size,
    model_id
  FROM
    Bike
  WHERE
    bike_sn IN (
      SELECT
        bike_sn avaiableBikeSn
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
              booking_state != 'cancelled' AND $1::tstzrange && booking_date_range)))
          AND bike_size = $2
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
    model_type = $3
    AND model_range = $4
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
  AvaiableBikes
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
