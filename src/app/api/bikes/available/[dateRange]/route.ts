// @ts-nocheck
//import { getAvailableSizesInRange } from '@/lib/pg-promise/crud/bikes'

import { getAvailableSizesInRange } from '@/lib/pg/crud/bikes'

export async function GET(req, { params }) {
   const { dateRange } = await params
   return await getAvailableSizesInRange({ dateRange })
}
