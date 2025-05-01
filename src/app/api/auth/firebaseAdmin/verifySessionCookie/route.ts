// @ts-nocheck
import { verifySessionCookie } from '@/lib/firebase/admin/verifySessionCookie'
import { el } from 'date-fns/locale'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

import chalk from 'chalk'
export async function GET(req) {
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   const cookieOptions = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
   }
   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
   console.warn(chalk.yellow('sssssssssss'))
   cookieStore.set('cookieName', 'sessionCookie', cookieOptions)

   const searchParams = req.nextUrl.searchParams
   const roleParam = searchParams.get('role')
   const cookieStore = await cookies()
   const sessionCookie =
      roleParam === 'admin'
         ? cookieStore.get('adminSession')
         : cookieStore.get('userSession')
   //console.log('HANDLER:verifySessionCookie sessionCookie ->', sessionCookie)
   //TODO: este verified solo indica que la cookie se ha verificado, no que el usuario haya
   //verificado su email. Gestiona el caso de no verificación de email en el middleware
   try {
      const decodeClaims = await verifySessionCookie(sessionCookie)
      //TODO: parche para pruebas , revisa el uso de roles
      //TODO los user actuales tienen appRole, el admin test no, usa appRole en adelante al crear usuarios
      const { appRole, email_verified: verified } = decodeClaims

      //TODO: ajusta esto cuando tengas appRole admin y manager
      //De momento, pongo !appRole porque el email que uso para testear no tiene appRole
      const isAppAdminRole = appRole !== 'user' || !appRole

      ////console.log('HANDLER: verifySessionCookie ADMIN ->', admin)
      if (roleParam === 'admin' && isAppAdminRole)
         return NextResponse.json({ success: true }, { status: 200 })

      if (roleParam === 'user' && appRole === 'user')
         if (verified)
            return NextResponse.json({ success: true }, { status: 200 })
         else
            return NextResponse.json(
               {
                  success: false,
                  message: 'El usuario no ha verificado su email',
                  error: {
                     details: 'Unverified email',
                     code: 'UNVERIFIED_EMAIL',
                  },
               },
               { status: 403 }
            )
      return NextResponse.json(
         {
            success: false,
            message: 'El usuario no tiene permisos para esta acción',
            error: {
               details: 'Custom claim check failed',
               code: 'ACCESS_DENIED',
            },
         },
         { status: 403 }
      )
   } catch (error) {
      return NextResponse.json(
         {
            success: false,
            message: 'Unauthorized',
            error,
         },
         { status: 401 }
      )
   }
}
