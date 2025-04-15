// @ts-nocheck
import { getMatchingUsers } from '@/lib/pg/crud/users'

export async function GET(req) {
   //console.log('ooooooooooooooooooooooooooooooooooooooooooo')
   const searchParams = req.nextUrl.searchParams
   const email = searchParams.get('email')
   const phone = searchParams.get('phone')
   return getMatchingUsers({ email, phone })

   //console.log('email -------->', email)
   //console.log('req.body -------->', req.method)
}
