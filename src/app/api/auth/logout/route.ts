// /app/api/logout/route.ts
//@ts-nocheck
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const cookieStore = await cookies()
   const sessionCookie = cookieStore.getAll()
   // const searchParams = request.nextUrl.searchParams
   // const cookieName = searchParams.get('cookieName')
   // console.log('cookieName -> ', cookieName)

   //  const response = NextResponse.json({ success: true })
   //   cookieName && response.cookies.delete(cookieName)
   const expiresIn = 60 * 60 * 24 * 5 * 1000

   const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: false }
   console.dir(
      'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss -> ',
      sessionCookie
   )
   cookieStore.set('aaaaa', 'eeeeeeeeeeeeee', cookieOptions)

   ///sessionCookie && cookieStore.delete(sessionCookie.name)
   return NextResponse.json(
      { success: true },
      { status: 200, headers: { 'Set-Cookie': 'name=rrrrr' } }
   )
   // return response})
   // Borrar cookie (esto dependerá de la API de cookies que estés usando)

   //return response
}
