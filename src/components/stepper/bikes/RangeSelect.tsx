// @ts-nocheck
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
import { rangeMap } from '@/utils/appValues'
import { capitalizeFirst, mappedBikeRange } from '@/utils/functions'
import SpinnerLine from '@/components/common/SpinnerLine'

export default function RangeSelect({
   form,
   availableRanges,
   handleChange,
   segmentList,

   className,
   isLoadingRange,
}) {
   const { size, type } = form.watch()
   const rangeArray = [...rangeMap.entries()] // Convertir el Map en un array antes de la iteración

   const rangeInfo = (range) => {
      let price
      segmentList.forEach((segment) => {
         if (type == segment.modelType && range == segment.modelRange)
            price = segment.segmentPrice
      })
      return price ? `${price} €/día` : 'no disponible'
   }

   return (
      <FormField
         control={form.control}
         name="range"
         render={({ field }) => (
            <FormItem className={className}>
               <FormLabel>Gama</FormLabel>
               <Select
                  //Al cambiar size o type, se vuelve a cargar el select
                  // y "gama" se pone oscuro
                  key={size + type}
                  onValueChange={handleChange(field)}
                  defaultValue={field.value}
               >
                  <FormControl>
                     <SelectTrigger className="w-auto">
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
                     {rangeArray.map(([engRange, spaRange]) => (
                        <SelectItem
                           disabled={
                              availableRanges
                                 ? !availableRanges.includes(engRange)
                                 : true
                           }
                           key={engRange}
                           value={engRange}
                        >
                           {type
                              ? `${capitalizeFirst(spaRange)} - ${rangeInfo(engRange)}`
                              : `${capitalizeFirst(spaRange)}`}
                        </SelectItem>
                     ))}

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
