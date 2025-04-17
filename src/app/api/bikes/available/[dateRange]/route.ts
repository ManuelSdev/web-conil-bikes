// @ts-nocheck
//import { getAvailableSizesInRange } from '@/lib/pg-promise/crud/bikes'

import { getAvailableSizesInRange } from '@/lib/pg/crud/bikes'

export async function GET(req, { params }) {
   //console.log('params en API @-> ', params)
   const { dateRange } = await params
   //console.log('dateRange en API @-> ', dateRange)
   //  '[2023-10-04T22:00:00.000Z,2023-10-31T22:59:59.999Z]'
   return await getAvailableSizesInRange({ dateRange })

   // return await getAvailableSizesInRange(dateRange)
}
