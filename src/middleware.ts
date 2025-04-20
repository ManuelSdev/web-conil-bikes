// @ts-nocheck
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { authMiddleware } from './authMiddleware'
import authPassMiddleware from './authPassMiddleware'
import datedStepperMiddleware from './datedStepperMiddleware'

// This function can be marked `async` if using `await` inside
/**
 * CLAVE: no puedes usar node modules en Edge Runtime
 * https://nextjs.org/docs/messages/node-module-in-edge-runtime
 * Entonces, no puedo importar y usar los módulos de firebase admin en este archivo
 * PERO: si puedo usar fetch
 * Entonces: he creado un route handler en /api/auth/firebaseAdmin.
 *  Este route handler es el que importa y usa los módulos de firebase admin.
 *  Y, en este archivo, hago un fetch a ese route handler
 */
export async function middleware(request) {
   const headersList = await headers()

   //console.log('request.url -> ', request.nextUrl)
   const path = (path) => request.nextUrl.pathname.startsWith(path)
   const pathName = request.nextUrl.pathname
   const searchPath = request.nextUrl.search
   // console.log('pathName ----=', pathName)
   const resolvedUrl = pathName + searchPath
   /*
  //console.log('middleware request.nextUrl -> ', request.nextUrl)
  //console.log(
      'middleware request.nextUrl.pathname -> ',
      request.nextUrl.pathname
   )
  //console.log('middleware request.url  ', request.url)
*/
   /**
    * CLAVE GORDA
    * SI haces  console.log('middleware request.nextUrl -> ', request.nextUrl), verás un montón
    * de console.logs donde la propiedad href es tipo:
    * href: 'http://localhost:3000/_next/static/chunks/webpack.js?v=1712854972682',
    *  href: 'http://localhost:3000/_next/static/chunks/app-pages-internals.js',
    *   href: 'http://localhost:3000/_next/static/chunks/app/(admin)/layout.js',
    * Esto implicaría que el middleware se ejecuta en cada una de estas peticiones, donde
    * la prpiedad pathname es '/_next/static/chunks/webpack.js' y no '/dashboard' o '/user' o '/abooking'
    * ENtonces, uso pathName.startsWith('/dashboard') para que solo se ejecute el middleware
    * en las rutas "reales" de la aplicación, como "/dashboard", "/user" o "/abooking, no en
    * el resto de rutas "internas" como "/_next/static/chunks/webpack.js
    *
    *
    */
   if (pathName.startsWith('/dashboard')) {
      //console.log('URL -------------> ', process.env.URL)
      //const refererHeader = headersList.get('referer')
      //const nextUrlHeader = headersList.get('next-url')

      const authMiddlewareResponse = await authMiddleware({
         isAdmin: true,
         request,
         NextResponse,

         resolvedUrl,
      })
      //console.log('request next url en middleware', request.nextUrl)
      if (authMiddlewareResponse) return authMiddlewareResponse
      return NextResponse.next()

      if (pathName.includes('/new/bikes' || '/new/address' || '/new/resume')) {
         const response = datedStepperMiddleware({
            request,
            NextResponse,
            urlToRedirect: '/dashboard/bookings/new/date' + searchPath,
         })
         if (response) return response
      }
   }
   //console.log('-------------------- pasa primer middleware')
   if (
      false &&
      pathName.startsWith('/dashboard') &&
      pathName.includes('/new/bikes' || '/new/address' || '/new/resume')
   ) {
      const response = datedStepperMiddleware({
         request,
         NextResponse,
         urlToRedirect: '/dashboard/bookings/new/date' + searchPath,
      })
      if (response) return response
   }
   //console.log('middleware request.nextUrl -> ', request.nextUrl)
   /*
   if (pathName.includes('/new/bikes' || 'address' || 'resume'))
      return datedStepperMiddleware({
         request,
         NextResponse,
         urlToRedirect: '/user/booking',
      })
      */
   // return NextResponse.redirect(new URL('/about-2', request.url))

   if (pathName.startsWith('/user'))
      return authMiddleware({
         isAdmin: false,
         request,
         NextResponse,
         resolvedUrl,
      })
   if (pathName.startsWith('/abooking'))
      return authPassMiddleware({
         request,
         NextResponse,
         urlToRedirect: '/user/booking',
      })
   // return NextResponse.redirect(new URL('/about-2', request.url))

   //return NextResponse.next()
   //  return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
