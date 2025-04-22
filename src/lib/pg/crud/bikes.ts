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

//console.log( '######### CLIENT importado en api/bikes/available/[dateRange]/route.js')
export async function getAvailableSizesInRange({ dateRange }) {
   //console.log('dateRange en getAvailableSizesInRange -> ', dateRange)
   try {
      //  const db = client()
      //console.log('@@ CRUD FN getAvailableSizesInRange @@')
      const availableSizes = await findAvailableSizesInRange({ dateRange })
      console.log(
         'availableSizes en getAvailableSizesInRange-> ',
         availableSizes
      )
      return NextResponse.json(
         { succes: true, data: { availableSizes } },
         { status: 201 }
      )
   } catch (error) {
      console.error('Error en consulta a la base de datos: ', error)
      return NextResponse.json(
         {
            succes: false,
            message: 'Error en consulta a la base de datos',
         },
         { status: 500 }
      )
      //console.log('### ERROR CRUD api/getAvailableSizesInRange -> ', error)
   }
}

export async function getAvailableTypes({ dateRange, size }) {
   try {
      //   const db = client()
      //console.log('@@ CRUD FN getAvailableTypes @@')
      const availableTypes = await findAvailableTypes({
         dateRange,
         size,
      })
      //console.log('availableTypes en getAvailableTypes-> ', availableTypes)
      return NextResponse.json(availableTypes, { status: 201 })
   } catch (error) {
      //console.log('### ERROR CRUD api/getAvailableTypes -> ', error)
   }
}

export async function getAvailableRanges({ dateRange, size, type }) {
   try {
      //   const db = client()
      //console.log('@@ CRUD FN getAvailableRanges @@')
      const availableRanges = await findAvailableRanges({
         dateRange,
         size,
         type,
      })
      //console.log('availableRanges en getAvailableRanges-> ', availableRanges)
      return NextResponse.json(availableRanges, { status: 201 })
   } catch (error) {
      //console.log('### ERROR CRUD api/getAvailableRanges -> ', error)
   }
}

export async function getAvailableBikes({ dateRange, size, type, range }) {
   try {
      //   const db = client()
      //console.log('@@ CRUD FN getAvailableBikes @@')
      const availableBikes = await findAvailableBikes({
         dateRange,
         size,
         type,
         range,
      })
      //console.log('availableBikes en getAvailableBikes-> ', availableBikes)
      return NextResponse.json(availableBikes, { status: 201 })
   } catch (error) {
      //console.log('### ERROR CRUD api/getAvailableBikes -> ', error)
   }
}
export async function getAppBikeConfigSegments() {
   try {
      //   const db = client()
      //console.log('@@ CRUD FN findAppBikesConfig @@')
      const config = await findAppBikeConfigSegments()
      // //console.log('availableTypes en findAppBikesConfig-> ', config)
      return NextResponse.json(config, { status: 201 })
   } catch (error) {
      //console.log('### ERROR CRUD api/getAppBikeConfigSegments -> ', error)
   }
}
