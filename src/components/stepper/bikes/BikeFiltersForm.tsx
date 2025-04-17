//@ts-nocheck
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import SizeSelect from './SizeSelect'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
   useGetAvailableBikesQueryState,
   useGetAvailableRangesMutation,
   useGetAvailableSizesQuery,
   // useLazyGetAvailableRangesQuery,
   useLazyGetAvailableTypesQuery,
} from '@/lib/redux/apiSlices/bikeApi'
import TypeSelect from './TypeSelect'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { urlParams } from '@/utils/app/functions'
import RangeSelect from './RangeSelect'
import { useDispatch, useSelector } from 'react-redux'
import { baseApi } from '@/lib/redux/apiSlices/baseApi'
const FormSchema = z.object({
   email: z
      .string({
         required_error: 'Please select an email to display.',
      })
      .email(),
})

export default function BikeFiltersForm({
   dateRange,
   availableSizes,
   segmentList,
   renderShowBikesButton,
   loadedSearchKeys,

   ...props
   //form,
   // setStep,
}) {
   const dispatch = useDispatch()

   console.log('loadedSearchKeys', loadedSearchKeys)
   const loadedSize = loadedSearchKeys?.size
   const loadedType = loadedSearchKeys?.type
   const loadedRange = loadedSearchKeys?.range

   const [loadedKeys, setLoadedKeys] = useState({
      loadedSize,
      loadedType,
      loadedRange,
   })

   const FormSchema = z.object({
      email: z
         .string({
            required_error: 'Please select an email to display.',
         })
         .email(),
   })

   const form = useForm(
      {
         defaultValues: {
            size: loadedSearchKeys?.size,
            type: loadedSearchKeys?.type,
            range: loadedSearchKeys?.range,
         },
      },

      { resolver: zodResolver(FormSchema) }
   )

   if (false) {
      form.setValue('size', loadedSearchKeys.size)
      form.setValue('type', loadedSearchKeys.type)
      form.setValue('range', loadedSearchKeys.range)
   }
   const { size, type, range } = form.watch()

   const a = useGetAvailableBikesQueryState({
      dateRange,
      size,
      type,
      range,
      //className: 'sm:self-end',
   })
   const [
      triggerType,
      {
         data: availableTypes,
         isFetching: isLoadingTypes,
         isSuccess: isSuccessTypes,
         unsubscribe: unsubscribeTypes,
      },
      lastPromiseInfoTypes,
   ] = useLazyGetAvailableTypesQuery()

   const [
      triggerRange,
      { data: availableRanges, isLoading: isLoadingRange, reset: resetRanges },
   ] = useGetAvailableRangesMutation()

   /* Uso la mutation en lugar de la query
   const [
      triggerRange,
      { data, isFetching: isLoadingRange, originalArgs },
      lastPromiseInfoRanges,
   ] = useLazyGetAvailableRangesQuery()
    */

   const handleClick = (ev) => {
      setStep(1)
      //resetBikeForm()
   }
   const handleSizeChange = (field) => (selectedSizeValue) => {
      field.onChange(selectedSizeValue)
      form.resetField('type')
      form.resetField('range')
      availableRanges && resetRanges()

      triggerType({ dateRange, size: selectedSizeValue })
   }

   const handleType = (field) => (selectedTypeValue) => {
      field.onChange(selectedTypeValue)
      form.resetField('range')

      triggerRange({ dateRange, size, type: selectedTypeValue })
   }

   const handleRange = (field) => (selectedRangeValue) => {
      field.onChange(selectedRangeValue)
   }

   const onSubmit = (data, event) => {
      event.preventDefault()
      // setStep(1)
   }

   //Clave para resetear los select
   //https://github.com/radix-ui/primitives/issues/1569#issuecomment-1434801848
   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            //   className="space-y-6 sm:grid sm:grid-cols-4 sm:isLoadingSizes-4 sm:space-y-0"
            className="space-y-8"
         >
            <SizeSelect
               loadedSize={loadedKeys.loadedSize}
               // className="sm:grow"
               className="space-y-2"
               form={form}
               selectedSize={size}
               handleChange={handleSizeChange}
               availableSizes={availableSizes}
               {...props}
            />
            <TypeSelect
               loadedType={loadedKeys.loadedType}
               // className="sm:grow"
               className="sm:min-w-[100px]"
               form={form}
               handleChange={handleType}
               isLoadingTypes={isLoadingTypes}
               availableTypes={availableTypes}
               {...props}
            />
            <RangeSelect
               loadedRange={loadedKeys.loadedRange}
               // className="sm:grow"
               className="sm:min-w-[165px]"
               segmentList={segmentList}
               form={form}
               handleChange={handleRange}
               isLoadingRange={isLoadingRange}
               availableRanges={availableRanges}
               {...props}
            />
            <div className="mx-auto max-w-xs">
               <div className="flex">
                  {renderShowBikesButton({
                     dateRange,
                     size,
                     type,
                     range,
                     className: 'grow',
                  })}
               </div>
            </div>
         </form>
      </Form>
   )
}
/**
 * Uso una mutation para obtener los rangos disponibles
 * y no una query porque la query no tiene reset
 * y la mutation si
 * reset permite borrar el cache de la query y, al borrar los rangos
 * disponibles, los select se "apagan" en el desplegable
 * No necesito reset en los types porque, al cambiar el size,
 * se hace una nueva petición para los tipos. El problema era
 * que, cambiando el size, los rangos descargados se mantenían
 * y dejaban el select activo
 */
