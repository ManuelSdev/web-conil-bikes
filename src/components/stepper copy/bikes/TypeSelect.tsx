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
import React, { useEffect, useState } from 'react'
import { sizesList, typesList } from '@/utils/appValues'
import { capitalizeFirst } from '@/utils/functions'
import SpinnerLine from '@/components/common/SpinnerLine'
import { is } from 'date-fns/locale'

export default function TypeSelect({
   form,
   availableTypes,
   handleChange,
   isLoadingTypes,
   className,
   disabled,
   loadedType,
   selectKey,
}) {
   //console.log('isLoadingTypes IN TypeSelect @->', isLoadingTypes)

   /*
   useEffect(() => {
      loadedType && form.setValue('type', loadedType)
   }, [])
*/

   const [types, setTypes] = useState(null)
   /*
   useEffect(() => {
      form.resetField('type')
   }, [isLoadingTypes])
   */
   /*
   useEffect(() => {
      if (availableTypes) {
         setTypes(availableTypes)
      }

   }, [availableTypes])*/
   console.log('selectKey', selectKey)
   return (
      <FormField
         control={form.control}
         name="type"
         render={({ field }) => (
            <FormItem className={className}>
               <FormLabel>Tipo</FormLabel>
               <Select
                  key={selectKey}
                  //      disabled={isLoadingTypes || !availableTypes}
                  onValueChange={handleChange(field)}
                  //defaultValue={loadedType ? loadedType : field.value}
                  defaultValue={field.value}
                  // value="sssss"
               >
                  <FormControl>
                     <SelectTrigger>
                        {isLoadingTypes ? (
                           <SpinnerLine />
                        ) : field.value ? (
                           <SelectValue
                              //  aria-label={field.value}
                              placeholder="Tipo"
                           />
                        ) : (
                           'Tipo'
                        )}
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                     {typesList.map((type) => {
                        const [engType, spaType] = type
                        return (
                           <SelectItem
                              selected={true}
                              disabled={
                                 availableTypes
                                    ? !availableTypes.includes(engType)
                                    : true
                              }
                              key={engType}
                              value={engType}
                           >
                              {capitalizeFirst(spaType)}
                           </SelectItem>
                        )
                     })}
                  </SelectContent>
               </Select>
               {/*   <FormDescription>
                  Selecciona una talla en función de tu altura
               </FormDescription>*/}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
