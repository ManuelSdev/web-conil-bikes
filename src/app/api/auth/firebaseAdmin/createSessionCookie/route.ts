// @ts-nocheck
import { getErrorResponseObj } from '@/app/api/utils'
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function POST(req) {
   app()
   const body = await req.json()
   const headersList = await headers()
   const cookieStore = await cookies()
   const { isAdmin } = body
   try {
      const authHeader = getHeader(headersList)
      const accessToken = getToken(authHeader)
      await setCookies({ isAdmin, accessToken })
      const resolvedUrl = cookieStore.get('resolvedUrl')
      // Construimos el objeto de respuesta de forma condicional.
      const responseBody = {
         success: true,
         message: 'Cookie de sesión creada correctamente',
      }
      if (resolvedUrl) responseBody.data = { resolvedUrl: resolvedUrl.value }
      return NextResponse.json(responseBody, { status: 200 })
   } catch (err) {
      const { success, message, error, status } = getErrorResponseObj(err)
      return NextResponse.json({ success, message }, { status })
   }
}

/******************************************* ****************************************/
function getHeader(headersList) {
   if (headersList.has('authorization')) return headersList.get('authorization')
   else
      throw new Error(
         JSON.stringify(
            {
               success: false,
               message: 'Unauthorized',
               status: 401,
               type: 'internal',
               error: {
                  details: 'Authorization header not found',
                  code: 'MISSING_AUTH_HEADER',
               },
            },
            null, // replacer, no lo necesitamos
            2 // nivel de indentación (2 espacios)
         )
      )
}

function getToken(authHeader) {
   if (authHeader.startsWith('Bearer '))
      return authHeader.substring(7, authHeader.length)
   else
      throw new Error(
         JSON.stringify({
            success: false,
            message: 'Unauthorized',
            status: 401,
            type: 'internal',
            error: {
               details: 'Authorization header must start with "Bearer"',
               code: 'INVALID_AUTH_HEADER',
            },
            //path: path.join(__dirname, 'createSessionCookie', 'route.ts'),
         })
      )
}

async function verifyCustomClaimsAdmin(accessToken) {
   const decodedToken = await getAuth().verifyIdToken(accessToken)
   const { appRole } = decodedToken
   return appRole === 'user' ? false : true
}

async function setCookies({ isAdmin, accessToken }) {
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   const cookieStore = await cookies()

   try {
      const sessionCookie = await getAuth().createSessionCookie(accessToken, {
         expiresIn,
      })
      const cookieName = isAdmin ? 'adminSession' : 'userSession'
      const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }
      cookieStore.set(cookieName, sessionCookie, cookieOptions)
   } catch (error) {
      throw new Error(
         JSON.stringify({
            success: false,
            message: 'Unauthorized',
            status: 401,
            type: 'external',
            source: 'firebase-admin/auth',
            error: {
               details: 'Error creating session cookie',
               code: 'UNAUTHORIZED REQUEST',
            },
            rawError: error,
            //path: path.join(__dirname, 'createSessionCookie', 'route.ts'),
         })
      )
   }
}

async function getRedirectUrl(isAdmin) {
   const cookieStore = await cookies()
   if (cookieStore.has('resolvedUrl')) {
      const resolvedUrl = cookieStore.get('resolvedUrl')
      cookieStore.delete('resolvedUrl')
      return resolvedUrl.value
   } else return '/auth/sign-in'
   //TODO: Cambiar la ruta de redirección según el rol del usuario
   if (isAdmin) return '/dashboard/bookings'
}
