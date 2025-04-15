// @ts-nocheck
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
//https://stackoverflow.com/questions/76356867/how-to-set-cookie-in-nextjs-13-4-2-in-api-route
export async function GET(req) {
   const expiresIn = 60 * 60 * 24 * 5 * 1000 //5 dias
   const cookieOptions = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      //  sameSite: strict,
   }
   const resolvedUrl = cookies().get('resolvedUrl')
   //console.log('resolvedUrl -> ', resolvedUrl)
   try {
      //console.log('@@@@@   ===============  @@@@@')

      //   cookies().set('ddddddd', '/hola')
      ////console.log('result -> ', result, 'status -> ', status)
      return new Response(
         { succes: true },
         {
            status: 200,
            headers: { 'Set-Cookie': `token=${'token'}` },
         }
      )
      const res = NextResponse.json({ result: 'ok' }, { status: 200 })
      res.cookies.set(resolvedUrl)
      return res
      return new Response(
         { result: 'ok' },
         {
            status: 200,
            headers: { 'Set-Cookie': `token=${token}` },
         }
      )
      return Response.json({ result: 'ok' }, { status: 200 })
   } catch (error) {
      //console.log('ROUTE HANDLER ERROR: /api/cookies  ->', error)
   }
}
