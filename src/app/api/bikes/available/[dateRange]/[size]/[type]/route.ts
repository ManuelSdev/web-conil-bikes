// @ts-nocheck
import { getAvailableRanges } from '@/lib/pg/crud/bikes'

export async function GET(req, { params }) {
   const { dateRange, size, type } = await params
   //console.log('dateRange @-> ', dateRange)
   //  '[2023-10-04T22:00:00.000Z,2023-10-31T22:59:59.999Z]'

   return await getAvailableRanges({ dateRange, size, type })
}
