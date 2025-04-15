// @ts-nocheck
import { set } from 'date-fns'

export const today = set(new Date(), {
   hours: 0,
   minutes: 0,
   seconds: 0,
   milliseconds: 0,
})

export const todayString = today.toISOString()
