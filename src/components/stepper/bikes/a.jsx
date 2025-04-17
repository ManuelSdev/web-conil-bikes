//@ts-nocheck
'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import React, { use, useEffect } from 'react'
import { BIKE_RANGES_MAP, rangesList, sizesList } from '@/utils/app/appValues'
import { capitalizeFirst } from '@/utils/app/functions'
import SpinnerLine from '@/components/common/SpinnerLine'

export default function RangeSelect({
   form,
   availableRanges,
   handleChange,
   segmentList,
   selectedType,
   className,
   disabled,
   isLoadingRange,
   isLoadingTypes,
   loadedRange,
   rangeKey,
}) {
   /*
   const segmentList = useSelector(selectDatabaseInfoSegmentList)
*/
   const rangeInfo = (range) => {
      let price
      segmentList.forEach((segment) => {
         if (selectedType == segment.modelType && range == segment.modelRange)
            price = segment.segmentPrice
      })
      return price ? `${price} €/día` : 'Gama no disponible'
   }
   //console.log('LOADING RANGE @->', isLoadingRange)

   /*
   useEffect(() => {
      loadedRange && form.setValue('range', loadedRange)
   }, [])
   */
   /*
   useEffect(() => {
      ;(isLoadingRange || isLoadingTypes) && form.resetField('range')
   }, [isLoadingRange, isLoadingTypes])
*/
   return (
      <FormField
         control={form.control}
         name="range"
         render={({ field }) => (
            <FormItem className={className}>
               <FormLabel>Gama</FormLabel>
               <Select
                  key={rangeKey}
                  onValueChange={handleChange(field)}
                  // defaultValue={loadedRange ? loadedRange : field.value}
                  defaultValue={field.value}
                  // value={field.value}
               >
                  <FormControl>
                     <SelectTrigger>
                        {isLoadingRange ? (
                           <SpinnerLine />
                        ) : field.value ? (
                           <SelectValue
                              //  aria-label={field.value}
                              placeholder="Gama"
                           />
                        ) : (
                           'Gama'
                        )}
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                     {rangesList.map(([engRange, spaRange]) => {
                        return (
                           <SelectItem
                              disabled={
                                 availableRanges
                                    ? !availableRanges.includes(engRange)
                                    : true
                              }
                              key={engRange}
                              value={engRange}
                           >
                              {`${capitalizeFirst(spaRange)} - ${rangeInfo(
                                 engRange
                              )}`}
                           </SelectItem>
                        )
                     })}

                     {/*  {availableRanges.map((range) => (
                           <SelectItem key={range} value={engRange}>
                              {`${capitalizeFirst(spaRange)} - ${rangeInfo(
                                 engRange
                              )}`}
                           </SelectItem>
                              ))}*/}
                  </SelectContent>
               </Select>
               {/*    <FormDescription>
                  Selecciona una talla en función de tu altura
                  </FormDescription>*/}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
