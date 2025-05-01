import { cookies } from 'next/headers'

export async function GET() {
   const cookieStore = await cookies()
   cookieStore.set('miCookie', 'valorCookie', {
      maxAge: 60 * 60 * 24, // 1 día
      httpOnly: true,
      secure: true,
   })
   return Response.json({ status: 200 })
}
