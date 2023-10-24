import { NextResponse } from 'next/server'
import adminAuthMiddleware from './adminAuthMiddleware'
import userAuthMiddleware from './userAuthMiddleware'

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
export function middleware(request) {
   const path = (path) => request.nextUrl.pathname.startsWith(path)
   const resolvedUrl = request.nextUrl.pathname

   //console.log('middleware -> ', request.nextUrl.pathname)
   if (resolvedUrl.startsWith('/dashboard'))
      return adminAuthMiddleware(request, NextResponse, resolvedUrl)
   // return NextResponse.redirect(new URL('/about-2', request.url))

   if (resolvedUrl.startsWith('/user'))
      return userAuthMiddleware(request, NextResponse, resolvedUrl)
   // return NextResponse.redirect(new URL('/about-2', request.url))

   //return NextResponse.next()
   //  return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more