//@ts-nocheck

import { getAuth } from 'firebase-admin/auth'

export const getFirebaseSessionCookie = async (
   accessToken: string
): Promise<string> => {
   const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 días en milisegundos
   try {
      const firebaseSessionCookieValue: string =
         await getAuth().createSessionCookie(accessToken, { expiresIn })
      return firebaseSessionCookieValue
   } catch (error: unknown) {
      throw error
   }
}
