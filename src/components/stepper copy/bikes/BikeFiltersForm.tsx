// @ts-nocheck
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
   useGetAvailableSizesQuery,
   useLazyGetAvailableRangesQuery,
   useLazyGetAvailableTypesQuery,
} from '@/lib/redux/apiSlices/bikeApi'
import { da, de } from 'date-fns/locale'
import TypeSelect from './TypeSelect'
import RangeSelect from './RangeSelect'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { urlParams } from '@/utils/functions'

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
   const { size, type, range } = form.getValues()
   const a = useGetAvailableBikesQueryState({
      dateRange,
      size,
      type,
      range,
      //className: 'sm:self-end',
   })
   console.log('--------------------------------- a @->', form.getValues())

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
   console.log('lastPromiseInfoTypes ->', lastPromiseInfoTypes)

   //Uso de keys para resetear los select: cambiar la key vuelve a renderizar el componente
   const [selectKeys, setSelectKeys] = useState({ typeKey: 0, rangeKey: 1 })
   const { typeKey, rangeKey } = selectKeys

   const [
      triggerRange,
      { data: availableRanges, isFetching: isLoadingRange },
      lastPromiseInfoRanges,
   ] = useLazyGetAvailableRangesQuery()

   const handleClick = (ev) => {
      setStep(1)
      //resetBikeForm()
   }
   const handleSizeChange = (field) => (selectedSizeValue) => {
      field.onChange(selectedSizeValue)
      form.resetField('type')
      form.resetField('range')
      setSelectKeys({ rangeKey: selectedSizeValue, typeKey: selectedSizeValue })
      //form.resetField('type')
      //form.resetField('range')
      // form.reset()
      // setBikeForm({ ...form, size: lastSelectedSize })
      console.log('## CALL getAvailableSizesInRange FROM BikeFilters ##')

      triggerType({ dateRange, size: selectedSizeValue })
   }

   const handleType = (field) => (selectedTypeValue) => {
      //console.log('field -> ', field)
      field.onChange(selectedTypeValue)
      form.resetField('range')
      setSelectKeys({ ...selectKeys, rangeKey: selectedTypeValue })
      //  updateBikeForm({ type: selectedTypeValue })
      triggerRange({ dateRange, size, type: selectedTypeValue })
   }

   const handleRange = (field) => (selectedRangeValue) => {
      //console.log('selectedRangeValue -> ', selectedRangeValue)
      field.onChange(selectedRangeValue)
      //updateBikeForm({ range: selectedRangeValue })
      //  setBikeForm({ ...form, range: lastSelectedRange })
      // triggerBike({...strDateRange,size,type,range:lastSelectedRange})
   }

   const onSubmit = (data, event) => {
      event.preventDefault()

      // setStep(1)
   }
   /*
   useEffect(() => {
      if (availableSizes && loadedKeys.loadedSize) {
         form.setValue('size', loadedKeys.loadedSize)
         triggerType({ dateRange, size: loadedKeys.loadedSize })
         setLoadedKeys({ ...loadedKeys, loadedSize: null })
      }
   }, [availableSizes])

   useEffect(() => {
      if (availableTypes && loadedKeys.loadedType) {
         form.setValue('type', loadedKeys.loadedType)
         triggerRange({ dateRange, size, type: loadedKeys.loadedType })
      }
   }, [availableTypes])

   useEffect(() => {
      if (availableRanges && loadedKeys.loadedRange) {
         form.setValue('range', loadedKeys.loadedRange)
         //triggerRange({ dateRange, size, range: loadedKeys.loadedRange })
      }
   }, [availableRanges])
*/
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
               // isLoading={isLoadingSizes}
               //     LoadingLabel={LoadingLabel}
               availableSizes={availableSizes}
               {...props}
            />
            <TypeSelect
               selectKey={typeKey}
               disabled
               loadedType={loadedKeys.loadedType}
               // className="sm:grow"
               className="sm:min-w-[100px]"
               form={form}
               selectedSize={size}
               selectedType={type}
               handleChange={handleType}
               isLoadingTypes={isLoadingTypes}
               //   LoadingLabel={LoadingLabel}
               availableTypes={availableTypes}
               {...props}
            />
            <RangeSelect
               key={rangeKey}
               loadedRange={loadedKeys.loadedRange}
               disabled
               // className="sm:grow"
               className="sm:min-w-[165px]"
               segmentList={segmentList}
               form={form}
               selectedType={type}
               selectedRange={range}
               handleChange={handleRange}
               isLoadingTypes={isLoadingTypes}
               isLoadingRange={isLoadingRange}
               //  LoadingLabel={LoadingLabel}
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
