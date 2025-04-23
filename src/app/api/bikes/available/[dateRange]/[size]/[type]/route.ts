// @ts-nocheck
import { getAvailableRanges } from '@/lib/pg/crud/bikes'

export async function GET(req, { params }) {
   const { dateRange, size, type } = await params
   return await getAvailableRanges({ dateRange, size, type })
}
