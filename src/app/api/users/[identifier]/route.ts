// @ts-nocheck
import { getUserByIdentifier } from '@/lib/pg/crud/users'
import { findUserByIdentifier } from '@/lib/pg/repos/users'

export async function GET(req, { params }) {
   //console.log('params en API @-> ', params)
   const searchParams = req.nextUrl.searchParams
   const withBikes = searchParams.get('bikes')
   const { identifier } = params
   console.log('identifier en API @-> ', identifier)
   //console.log('dateRange en API @-> ', dateRange)
   //  '[2023-10-04T22:00:00.000Z,2023-10-31T22:59:59.999Z]'
   return await getUserByIdentifier(identifier)

   // return await getAvailableSizesInRange(dateRange)
}
