// @ts-nocheck
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'
//todo error codes
export async function GET(req) {
   const searchParams = req.nextUrl.searchParams
   /**
    * Solo se recibe uno de los dos parámetros
    */
   const uid = searchParams.get('uid')
   const email = searchParams.get('email')
   //console.log('uid ->', uid)
   //console.log('email ->', email)
   app()
   try {
      const userRecord = uid
         ? await getAuth().getUser(uid)
         : await getAuth().getUserByEmail(email)

      return Response.json(userRecord, { status: 201 })
   } catch (error) {
      const { errorInfo } = error
      console.log(
         'ROUTE HANDLER ERROR: /api/auth/firebaseAdmin/getUserData  ->',
         error
      )
      console.log(
         'ROUTE HANDLER ERROR: /api/auth/firebaseAdmin/getUserData  ->',
         error.errorInfo
      )
      //return redirectToUnauthorized()
      return Response.json(errorInfo, { status: 500 })
   }
}
