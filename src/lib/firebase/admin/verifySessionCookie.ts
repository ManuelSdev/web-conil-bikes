// @ts-nocheck
'use server'
import 'server-only'
import React from 'react'
import { app } from './firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'
import { cookies } from 'next/headers'
import { CustomError } from '@/domain/models/error/CustomError'
import { logout } from '@/domain/services/authServices'

export async function verifySessionCookie(sessionCookie) {
   // console.log('verifying session cookie ->>>', sessionCookie)

   app()
   //Si verififySessionCookie falla, devuelve un error
   //Fallará si la cookie expira o si la firma de la cookie no es válida
   //https://firebase.google.com/docs/auth/admin/errors?hl=es-419
   //logout(sessionCookie)
   try {
      const decodeClaims = await getAuth().verifySessionCookie(
         sessionCookie.value
      )
      // console.log('decodeClaims ->>>', decodeClaims)
      return decodeClaims
   } catch (error) {
      if (
         error.code === 'auth/session-cookie-expired' ||
         error.code === 'auth/session-cookie-revoked'
      ) {
         // create(sessionCookie)
         // redirect('/login')
         //   logout(sessionCookie)
      }

      //  cookieStore.delete(sessionCookie.name)
      throw error
      throw new CustomError({
         success: false,
         message:
            'La sesión ha sido revocada. Por favor, inicia sesión nuevamente.',
         status: 401,
         type: 'external',
         source: 'firebase-admin/auth',
         error: {
            details:
               'La cookie de sesión fue revocada. Esto puede ocurrir tras un cambio de contraseña u otra medida de seguridad.',
            code: 'auth/session-cookie-revoked',
         },
         rawError: error,

         //path: path.join(__dirname, 'createSessionCookie', 'route.ts'),
      })
   }
}
/*
export async function uf(sessionCookie) {
   'use server'
   console.log(
      '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
      `.${new URL(process.env.URL).hostname}`
   )
   const cookieStore = await cookies()
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }

   cookieStore.delete({
      name: sessionCookie.name,
      domain: `.${new URL(process.env.URL).hostname}`,
   })
   // cookieStore.set('cookieName', sessionCookie, cookieOptions)
}
*/
