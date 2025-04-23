// @ts-nocheck
import { getAvailableTypes } from '@/lib/pg/crud/bikes'

export async function GET(req, { params }) {
   const { dateRange, size } = await params
   return await getAvailableTypes({ dateRange, size })
}
