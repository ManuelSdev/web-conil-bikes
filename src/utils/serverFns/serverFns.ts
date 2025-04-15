// @ts-nocheck
import 'server-only'
import { verifySessionCookie } from '@/lib/firebase/admin/verifySessionCookie'
import { getAppBikeConfigSegments } from '@/lib/pg/crud/bikes'
import { getUserIdByEmail } from '@/lib/pg/crud/users'
import { cookies } from 'next/headers'
import { findUserByEmail, findUserIdByEmail } from '@/lib/pg/repos/users'

export async function getUserPageAuth() {
   const cookieStore = await cookies()
   const userSessionCookie = cookieStore.get('userSession')
   console.log('userSessionCookie -> ', userSessionCookie)
   if (!userSessionCookie) return { isLogged: false }

   try {
      const decodeClaims = await verifySessionCookie(userSessionCookie.value)

      //  if (!decodeClaims)

      const { name, email, phone_number: phone } = decodeClaims

      const resUserId = await getUserIdByEmail({ email })
      const userId = await resUserId.json()
      return { name, email, phone, userId, isLogged: true }
   } catch (error) {
      console.log('getUserPageAuth error -> ', error)
      return { isLogged: false }
   }
}

export async function getAppBikeSegments() {
   const resAppBikesConfigSegments = await getAppBikeConfigSegments()
   const segmentList = await resAppBikesConfigSegments.json()
   return { segmentList }
}

export async function getAdminUserAuth() {
   const adminSessionCookie = cookies().get('adminSession')

   try {
      const decodeClaims = await verifySessionCookie(adminSessionCookie.value)
      //const { name, email, phone_number: phone } = decodeClaims
      return decodeClaims
   } catch (error) {
      console.log('getAdminUserAuth error -> ', error)
      return { isError: true, error }
   }
}

export async function getAdminData() {
   const adminSessionCookie = cookies().get('adminSession')
   try {
      const decodeClaims = await verifySessionCookie(adminSessionCookie.value)
      const { name, email, phone_number: phone } = decodeClaims
      const adminData = findUserByEmail({ email })

      return adminData
   } catch (error) {
      console.log('getAdminData error -> ', error)
      return { isError: true, error }
   }
}

export async function getAdminId() {
   const adminSessionCookie = cookies().get('adminSession')
   try {
      const decodeClaims = await verifySessionCookie(adminSessionCookie.value)
      console.log('decodeClaims -> ', decodeClaims)
      const { name, email, phone_number: phone } = decodeClaims
      const adminId = findUserIdByEmail({ email })

      return adminId
   } catch (error) {
      console.log('getAdminData error -> ', error)
      return { isError: true, error }
   }
}
