// @ts-nocheck
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import { is } from 'date-fns/locale'
import { getAuth } from 'firebase-admin/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function POST(req) {
   //   const body = await req.json()
   const { result, status } = await createSessionCookie(req)
   //console.log('result -> ', result, 'status -> ', status)
   return Response.json(result, status)
}

async function createSessionCookie(req) {
   app()
   const body = await req.json()
   const { isAdmin } = body
   //console.log('isAdmin -> ', isAdmin)
   const authHeader = req.headers.get('authorization')
   const accessToken = getToken(authHeader)
   ////console.log('accessToken -> ', accessToken)
   // const isAdmin = await verifyCustomClaimsAdmin(accessToken)
   //console.log('uno -> ')
   const res = await setCookies({ isAdmin, accessToken })
   console.log('################ res en createSessionCookie -> ', res)
   if (res.result.success) {
      const resolvedUrl = await getRedirectUrl({ isAdmin, req })
      console.log(
         '################ resolvedUrl en createSessionCookie -> ',
         resolvedUrl
      )
      res.result.resolvedUrl = resolvedUrl
      return res
   } else return res
}
/******************************************* ****************************************/

function getToken(authHeader) {
   if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7, authHeader.length)
   } else {
      //console.log('ERROR ON GET-TOKEN')
   }
}

async function verifyCustomClaimsAdmin(accessToken) {
   const decodedToken = await getAuth().verifyIdToken(accessToken)
   const { appRole } = decodedToken
   return appRole === 'user' ? false : true
}

async function setCookies({ isAdmin, accessToken }) {
   ////console.log('accessToken -> ', accessToken)
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   try {
      const sessionCookie = await getAuth().createSessionCookie(accessToken, {
         expiresIn,
      })
      //console.log('sessionCookie -> ', sessionCookie)
      const cookieName = isAdmin ? 'adminSession' : 'userSession'
      const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }
      cookies().set(cookieName, sessionCookie, cookieOptions)
      return { result: { success: true }, status: { status: 200 } }
   } catch (err) {
      //console.log('ERROR createSessionCookie  ', err)
      // res.status(401).send('UNAUTHORIZED REQUEST!')
      return {
         result: { success: false, message: 'UNAUTHORIZED REQUEST!' },
         status: { status: 401 },
      }
   }
}

async function getRedirectUrl({ isAdmin, req }) {
   if (cookies().has('resolvedUrl')) {
      const resolvedUrl = cookies().get('resolvedUrl')
      cookies().delete('resolvedUrl')
      console.log(
         '**************** BORRADA COOKIE DE REDIRECCIÓN en api/aut/createSessionCookie/route.js getRedirectUrl'
      )
      //console.log('resolvedUrl -> ', resolvedUrl)
      //borra la cookie
      // res.setHeader('Set-Cookie', `resolvedUrl=0; Max-Age=0`)
      return resolvedUrl.value
   } else return '/'
   //console.log('***************** isAdmin -> ', isAdmin)
   ////console.log('***************** req -> ', req.cookies.has('resolvedUrl'))
   if (isAdmin) return '/dashboard/bookings'
   else if (cookies().has('resolvedUrl')) {
      const resolvedUrl = cookies().get('resolvedUrl')
      cookies().delete('resolvedUrl')
      console.log(
         '**************** BORRADA COOKIE DE REDIRECCIÓN en api/aut/createSessionCookie/route.js getRedirectUrl'
      )
      //console.log('resolvedUrl -> ', resolvedUrl)
      //borra la cookie
      // res.setHeader('Set-Cookie', `resolvedUrl=0; Max-Age=0`)
      return resolvedUrl.value
   } else return '/'
}
