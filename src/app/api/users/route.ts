// @ts-nocheck
import { getUserByEmail } from '@/lib/pg/crud/users'

export async function GET(req) {
   //console.log('ooooooooooooooooooooooooooooooooooooooooooo')
   const searchParams = req.nextUrl.searchParams
   const email = searchParams.get('email')
   //console.log('email -------->', email)
   return getUserByEmail({ email })
   //console.log('req.body -------->', req.method)
}
