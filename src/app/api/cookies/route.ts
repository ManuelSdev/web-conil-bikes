// @ts-nocheck
import { cookies } from 'next/headers'

export async function GET(req) {
   const searchParams = req.nextUrl.searchParams
   console.log('searchParams????????????????????????', searchParams)
   const name = searchParams.get('name')
   const value = searchParams.get('value')
   const maxAge = searchParams.get('maxAge')
   //console.log('*********** ------------- **************', name)
   //console.log('*********** ------------- **************', value)
   //console.log('*********** ------------- **************', maxAge)
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   try {
      const cookieOptions = {
         maxAge: maxAge ? maxAge : expiresIn,
         httpOnly: true,
         secure: true,
      }
      const cookieStore = await cookies()
      cookieStore.set(name, value, cookieOptions)
      return Response.json({ succes: true })
      // cookies().delete('resolvedUrl')
      //  return { result: { success: true }, status: { status: 200 } }
   } catch (err) {
      //console.log('ERROR al crear cookie en api/cookies  ', err)
      return Response.json({ succes: false })
      // res.status(401).send('UNAUTHORIZED REQUEST!')
   }
}
