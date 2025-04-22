// @ts-nocheck

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { bookingStatusTranslationMap } from '@/types/bookingTypes'
//Primera letra en mayúscula
export const capitalizeFirst = (text) =>
   text.charAt(0).toUpperCase() + text.slice(1)

export const pipe =
   (...fns) =>
   (arg) =>
      fns.reduce((acc, fn) => fn(acc), arg)
/*
export const mappedBookingState = (state: BookingStateEnum) =>
   bookingStatusTranslationMap.get(state)?.charAt(0).toUpperCase() +
   bookingStatusTranslationMap.get(state)?.slice(1)

export const mappedBikeType = (type: BikeType) =>
   bikeTypeTranslationMap.get(type)?.charAt(0).toUpperCase() +
   bikeTypeTranslationMap.get(type)?.slice(1)

export const mappedBikeRange = (range: BikeRange) =>
   bikeRangeTranslationMap.get(range)?.charAt(0).toUpperCase() +
   bikeRangeTranslationMap.get(range)?.slice(1)
*/
export const _mappedBookingState = (state) =>
   BOOKING_STATES_MAP[state]?.charAt(0).toUpperCase() +
   BOOKING_STATES_MAP[state]?.slice(1)

export const _mappedBikeType = (type) =>
   BIKE_TYPES_MAP[type]?.charAt(0).toUpperCase() +
   BIKE_TYPES_MAP[type]?.slice(1)

export const _mappedBikeRange = (range) =>
   BIKE_RANGES_MAP[range]?.charAt(0).toUpperCase() +
   BIKE_RANGES_MAP[range]?.slice(1)

export const simpleFormatFromToDate = (from, to) => {
   //console.log(from)
   return {
      formatedFrom: format(new Date(from), 'dd/MM/yyyy'),
      formatedTo: format(new Date(to), 'dd/MM/yyyy'),
   }
}

export function cn(...inputs) {
   return twMerge(clsx(inputs))
}

export const urlParams = (obj) => new URLSearchParams(obj)
/**
 * Crea contraseña aleatoria
 */
export function generatePassword() {
   let letters = 'abcdefghijklmnopqrstuvwxyz'
   let numbers = '0123456789'
   let password = ''

   for (let i = 0; i < 4; i++) {
      password += letters.charAt(Math.floor(Math.random() * letters.length))
   }

   for (let i = 0; i < 4; i++) {
      password += numbers.charAt(Math.floor(Math.random() * numbers.length))
   }

   return password
}
