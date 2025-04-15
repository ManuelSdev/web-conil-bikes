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
import React, { useEffect } from 'react'
import { sizeMap } from '@/utils/appValues'
import SpinnerLine from '@/components/common/SpinnerLine'

export default function SizeSelect({
   form,
   availableSizes,
   handleChange,
   isLoadingSizes,
   className,
   loadedSize,
   loadedData,
}) {
   //const loadedSize = loadedSearchKeys?.size
   console.log('loadedSize', loadedSize)
   /*
   useEffect(() => {
      availableSizes && loadedSize && form.setValue('size', loadedSize)
   }, [availableSizes])
*/

   const sizeArray = [...sizeMap.entries()] // Convertir sizeMap a un array antes de iterar

   return (
      <FormField
         control={form.control}
         name="size"
         render={({ field }) => (
            // console.log('field -> ', field) ||
            <FormItem className={className}>
               <FormLabel>Talla</FormLabel>
               <Select
                  onValueChange={handleChange(field)}
                  //defaultValue={loadedSize ? loadedSize : field.value}
                  defaultValue={field.value}
                  //   defaultValue={field.value}
               >
                  <FormControl>
                     <SelectTrigger>
                        {isLoadingSizes ? (
                           <SpinnerLine />
                        ) : field.value ? (
                           <SelectValue placeholder="Talla">
                              {field.value?.toUpperCase()}
                           </SelectValue>
                        ) : (
                           'Talla'
                        )}
                     </SelectTrigger>
                     {/* <SelectTrigger>
                        {isLoadingSizes ? (
                           <SpinnerLine />
                        ) : field.value ? (
                           <SelectValue
                              //  aria-label={field.value}
                              placeholder="Talla"
                           />
                        ) : (
                           'Talla'
                        )}
                        </SelectTrigger>*/}
                  </FormControl>

                  <SelectContent>
                     {sizeArray.map(([size, [min, max]]) => (
                        <SelectItem
                           disabled={
                              availableSizes
                                 ? !availableSizes.includes(size)
                                 : true
                           }
                           key={size}
                           value={size}
                        >
                           {`${size.toUpperCase()} - si mides entre ${min} y ${max} cm`}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               {/* <FormDescription>
                  Selecciona una talla en función de tu altura
                  </FormDescription>*/}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
