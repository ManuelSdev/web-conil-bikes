// @ts-nocheck
import 'server-only'

import { cache } from 'react'

import { NextResponse } from 'next/server'
import {
   findAvailableBikes,
   findAvailableRanges,
   findAvailableSizesInRange,
   findAvailableTypes,
   findAppBikeConfigSegments,
} from '../repos/bikes'
import { dbErrorResponse } from '@/app/api/utils'

//console.log( '######### CLIENT importado en api/bikes/available/[dateRange]/route.js')

export async function getAvailableSizesInRange({ dateRange }) {
   try {
      const availableSizes = await findAvailableSizesInRange({ dateRange })
      return NextResponse.json(
         { succes: true, data: { availableSizes } },
         { status: 201 }
      )
   } catch (error) {
      return dbErrorResponse(error)
      //console.log('### ERROR CRUD api/getAvailableSizesInRange -> ', error)
   }
}

export async function getAvailableTypes({ dateRange, size }) {
   try {
      const availableTypes = await findAvailableTypes({
         dateRange,
         size,
      })
      console.log('availableTypes en getAvailableTypes-> ', availableTypes)
      return NextResponse.json(
         { succes: true, data: { availableTypes } },
         { status: 201 }
      )
   } catch (error) {
      return dbErrorResponse(error)
   }
}

export async function getAvailableRanges({ dateRange, size, type }) {
   try {
      const availableRanges = await findAvailableRanges({
         dateRange,
         size,
         type,
      })
      return NextResponse.json(
         { succes: true, data: { availableRanges } },
         { status: 201 }
      )
   } catch (error) {
      return dbErrorResponse(error)
   }
}
export async function getAvailableBikes({ dateRange, size, type, range }) {
   try {
      const availableBikes = await findAvailableBikes({
         dateRange,
         size,
         type,
         range,
      })
      return NextResponse.json(
         { succes: true, data: { availableBikes } },
         { status: 201 }
      )
   } catch (error) {
      return dbErrorResponse(error)
   }
}

export async function getAppBikeConfigSegments() {
   try {
      const config = await findAppBikeConfigSegments()
      return NextResponse.json(config, { status: 201 })
   } catch (error) {
      return dbErrorResponse(error)
   }
}
