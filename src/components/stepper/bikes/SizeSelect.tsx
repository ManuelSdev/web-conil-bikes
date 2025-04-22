// @ts-nocheck

import SpinnerLine from '@/components/common/SpinnerLine'
import {
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
import { bikeSizeMap } from '@/constants/bikeConstants'

export default function SizeSelect({
   form,
   availableSizes,
   handleChange,
   isLoadingSizes,
   className,
   loadedSize,
   loadedData,
}) {
   const sizeArray = [...bikeSizeMap.entries()] // Convertir sizeMap a un array antes de iterar

   return (
      <FormField
         control={form.control}
         name="size"
         render={({ field }) => (
            <FormItem className={className}>
               <FormLabel>Talla</FormLabel>
               <Select
                  onValueChange={handleChange(field)}
                  defaultValue={field.value}
               >
                  <FormControl>
                     <SelectTrigger className="w-auto">
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
               {
                  <FormDescription>
                     Selecciona una talla en función de tu altura
                  </FormDescription>
               }
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
