// @ts-nocheck
import { is } from 'date-fns/locale'
import { query } from '../db'
import {
   txtFindMatchingUsers,
   txtFindUserByEmail,
   txtFindUserByIdOrPhone,
} from './userText'

/**
 *
 * @param {*} param0
 * @returns array of users or false
 */
export const findMatchingUsers = async ({ email, phone }) => {
   const text = txtFindMatchingUsers
   const values = [`%${email}%`, `%${phone}`]
   const rowMode = 'array'
   const { rows } = await query({ text, values })
   if (rows.length === 0) return null
   // const [user] = rows.flat()
   //console.log('userId en findUserByEmail -> ', user)
   return rows
}

export const findUserByEmail = async ({ email }) => {
   const text = 'SELECT * FROM App_user WHERE user_email=$1'
   const values = [email]
   const rowMode = 'array'
   const {
      rows: [user],
   } = await query({ text, values })
   // const [user] = rows.flat()
   console.log('user en findUserByEmail -> ', user)
   return user
}

export const findUserById = async (userId) => {
   const text = 'SELECT * FROM App_user WHERE user_id=$1'
   const values = [userId]
   const rowMode = 'array'
   const {
      rows: [user],
   } = await query({ text, values })
   // const [user] = rows.flat()
   console.log('user en findUserById -> ', user)
   const resUser = {
      name: user.user_name,
      email: user.user_email,
      phone: user.user_phone,
      role: user.user_role,
      active: user.user_active,
      created: user.user_created,
      userId: user.user_id,
   }
   console.log('resUser en findUserById -> ', resUser)
   return resUser
}
//clAVE INTERPOLACION https://github.com/brianc/node-postgres/issues/503

export const findUserByIdentifier = async (identifier) => {
   const isNumber = (str) => !isNaN(Number(str))

   const text = isNumber(identifier)
      ? txtFindUserByIdOrPhone
      : txtFindUserByEmail
   console.log('text en findUserByIdentifier -> ', text)
   console.log('identifier en findUserByIdentifier -> ', identifier)
   //TODO: afina el tema de los numeros de telefono con un segundo %, teniendo en cuenta el +34, etc
   const values = isNumber(identifier)
      ? [identifier, `%${identifier}`]
      : [`%${identifier}%`]
   console.log('values en findUserByIdentifier -> ', values)
   const rowMode = 'array'
   const { rows } = await query({ text, values })
   // const [user] = rows.flat()
   console.log('userId en findUserByEmail -> ', rows)
   return rows
}

export const findUserIdByEmail = async ({ email }) => {
   console.log('email en findUserIdByEmail -> ', email)
   const text = 'SELECT user_id FROM App_user WHERE user_email=$1'
   const values = [email]
   const rowMode = 'array'

   const { rows } = await query({ text, values, rowMode })
   console.log('rows en findUserIdByEmail -> ', rows)
   const [userId] = rows.flat()
   return userId
}

export const findUserRole = async ({ email }) => {
   const text = 'SELECT user_role FROM App_user WHERE user_email=$1'
   const values = [email]
   const rowMode = 'array'
   const { rows } = await query({ text, values, rowMode })
   const [userId] = rows.flat()
   return userId
}
export const addUser = async ({
   name,
   email,
   phone,
   role,
   isCreatedByAdmin,
}) => {
   const text =
      'INSERT INTO App_user (user_name,user_email,user_phone,user_role,user_active) VALUES ($1,$2,$3,$4,$5) RETURNING user_id'
   const values = isCreatedByAdmin
      ? [name, email, phone, role, false]
      : [name, email, phone, role, true]
   const rowMode = 'array'
   const { rows } = await query({ text, values, rowMode })
   const [addedUserId] = rows.flat()
   return addedUserId
}

export const addUserByAdmin = async ({ name, email, phone, role }) => {
   const text =
      'INSERT INTO App_user (user_name,user_email,user_phone,user_role,user_active) VALUES ($1,$2,$3,$4,$5) RETURNING user_id'
   const values = [name, email, phone, role, false]
   const rowMode = 'array'
   const { rows } = await query({ text, values, rowMode })
   const [addedUserId] = rows.flat()
   return addedUserId
}
