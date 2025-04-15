// @ts-nocheck
//import { getAvailableBikes } from '@/lib/pg-promise/crud/bikes'

import { getAvailableBikes } from '@/lib/pg/crud/bikes'

export async function GET(req, { params }) {
   const { dateRange, size, type, range } = params
   //console.log('dateRange @-> ', dateRange)
   //  '[2023-10-04T22:00:00.000Z,2023-10-31T22:59:59.999Z]'

   return await getAvailableBikes({ dateRange, size, type, range })
}
