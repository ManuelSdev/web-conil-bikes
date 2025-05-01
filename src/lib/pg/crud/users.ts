// @ts-nocheck
import 'server-only'

import { cache } from 'react'
import {
   addUser,
   findMatchingUsers,
   findUserByEmail,
   findUserByIdentifier,
   findUserIdByEmail,
   findUserRole,
} from '../repos/users'
import { NextResponse } from 'next/server'
import { th } from 'date-fns/locale'
import { dbErrorResponse } from '@/app/api/utils'

export async function getMatchingUsers({ email, phone }) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   /**
    * Si existe usuarios con el mismo email o teléfono,
    * se devuelve un array con los usuarios que coinciden
    */
   try {
      //  const db = client()
      //console.log('@@ CRUD FN getUserByEmail @@')
      const users = await findMatchingUsers({ email, phone })
      console.log('appUser en getUserByEmail-> ', users)
      return NextResponse.json(users, { status: 201 })
   } catch (error) {
      console.log('### ERROR CRUD api/getMatchingUsers -> ', error)
      return NextResponse.json(error, { status: 500 })
   }
}

export async function getUserByEmail({ email }) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   try {
      //  const db = client()
      //console.log('@@ CRUD FN getUserByEmail @@')
      const appUser = await findUserByEmail({ email })
      //console.log('appUser en getUserByEmail-> ', appUser)
      return NextResponse.json(appUser, { status: 201 })
   } catch (error) {
      console.log('### ERROR CRUD api/getUserByEmail -> ', error)
      return NextResponse.json(error, { status: 500 })
   }
}
export async function getUserByIdentifier(identifier) {
   console.log('identifier en getUserByIdentifier -> ', identifier)
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   try {
      //  const db = client()
      //console.log('@@ CRUD FN getUserByEmail @@')
      const users = await findUserByIdentifier(identifier)
      console.log('appUser en getUserByEmail-> ', users)
      return NextResponse.json(users, { status: 201 })
   } catch (error) {
      console.log('### ERROR CRUD api/getUserByEmail -> ', error)
      return NextResponse.json(error, { status: 500 })
   }
}

export async function getUserIdByEmail({ email }) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   try {
      //  const db = client()
      //console.log('@@ CRUD FN getUserIdByEmail @@')
      const userId = await findUserIdByEmail({ email })
      //console.log('appUser en getUserIdByEmail-> ', userId)
      return NextResponse.json(
         { succes: true, data: { userId } },
         { status: 201 }
      )
      return NextResponse.json(userId, { status: 201 })
   } catch (error) {
      //console.log('### ERROR CRUD api/getUserIdByEmail -> ', error)
      return dbErrorResponse(error)
      return NextResponse.json(error, { status: 500 })
   }
}

export async function searchUser({ email }) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   try {
      //  const db = client()
      //console.log('@@ CRUD FN getUserIdByEmail @@')
      const userId = await findUserIdByEmail({ email })
      //console.log('appUser en getUserIdByEmail-> ', userId)
      return NextResponse.json(userId, { status: 201 })
   } catch (error) {
      //console.log('### ERROR CRUD api/getUserIdByEmail -> ', error)
      return NextResponse.json(error, { status: 500 })
   }
}

export async function getUserRole({ email }) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   try {
      //  const db = client()
      //console.log('@@ CRUD FN getUserRole @@')
      const userRole = await findUserRole({ email })
      //console.log('appUser en getUserRole-> ', userRole)
      return NextResponse.json(userRole, { status: 201 })
   } catch (error) {
      //console.log('### ERROR CRUD api/getUserRole -> ', error)
      return NextResponse.json(error, { status: 500 })
   }
}

export async function createAppUser(
   { name, email, phone, role, isCreatedByAdmin },
   rawQuery
) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   //rawquery retorna directamente la query para que el error se maneje en otra parte
   if (rawQuery)
      return await addUser({
         name,
         email,
         phone,
         role,
         isCreatedByAdmin,
      })
   try {
      //  const db = client()
      //console.log('@@ CRUD FN createUser @@')
      const createdAppUserId = await addUser({
         name,
         email,
         phone,
         role,
         isCreatedByAdmin,
      })
      //console.log('createdUserId en createUser-> ', createdAppUserId)
      //return createdAppUserId
      return rawQuery
         ? createdAppUserId
         : NextResponse.json(createdAppUserId, { status: 201 })
   } catch (error) {
      console.log('############### ERROR CRUD api/createUser -> ', error)
      if (rawQuery) throw error
      return NextResponse.json(error, { status: 500 })
   }
}
export async function _____createAppUser({
   name,
   email,
   phone,
   role,
   isCreatedByAdmin,
}) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)

   try {
      //  const db = client()
      //console.log('@@ CRUD FN createUser @@')
      const createdAppUserId = await addUser({
         name,
         email,
         phone,
         role,
         isCreatedByAdmin,
      })
      //console.log('createdUserId en createUser-> ', createdAppUserId)
      return createdAppUserId
      return NextResponse.json(createdAppUserId, { status: 201 })
   } catch (error) {
      console.log('############### ERROR CRUD api/createUser -> ', typeof error)
      throw new Error(error)
   }
}
