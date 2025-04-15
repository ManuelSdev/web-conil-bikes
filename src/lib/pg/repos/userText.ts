// @ts-nocheck
/*
const text = `
SELECT
 user_email AS email,
 user_name AS name,
 user_phone AS phone,
 user_id AS "userId"
FROM app_user
WHERE 
${
   isNumber(identifier)
      ? `user_id=${identifier} OR user_phone LIKE '%${identifier}'`
      : `user_email ILIKE '%${identifier}%'`
}
`
*/
//clAVE INTERPOLACION https://github.com/brianc/node-postgres/issues/503

export const txtFindUserByIdOrPhone = `
SELECT
 user_email AS email,
 user_name AS name,
 user_phone AS phone,
 user_id AS "userId"
FROM app_user
    WHERE user_id=$1
    OR user_phone LIKE $2
`

export const txtFindUserByEmail = `
SELECT
 user_email AS email,
 user_name AS name,
 user_phone AS phone,
 user_id AS "userId"
FROM app_user
WHERE user_email ILIKE $1
`

//TODO: afina para busque coincidencias por el string del email que hay antes del @
export const txtFindMatchingUsers = `
SELECT
 user_email AS email,
 user_name AS name,
 user_phone AS phone,
 user_id AS "userId"
FROM app_user
WHERE user_email ILIKE $1
OR user_phone LIKE $2
`
