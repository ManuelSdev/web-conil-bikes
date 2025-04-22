// @ts-nocheck

import SpinnerLine from '@/components/common/SpinnerLine'
import {
   FormControl,
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
import { bikeTypeTranslationMap } from '@/constants/bikeConstants'
import { capitalizeFirst } from '@/utils/functions'

export default function TypeSelect({
   form,
   availableTypes,
   handleChange,
   isLoadingTypes,
   className,
   selectedSize,

   // selectKey,
}) {
   const typeArray = [...bikeTypeTranslationMap.entries()] // Convertir el Map en un array antes de iterar
   const { size, type } = form.watch()
   return (
      <FormField
         control={form.control}
         name="type"
         render={({ field }) => (
            <FormItem className={className}>
               <FormLabel>Tipo</FormLabel>
               <Select
                  key={size}
                  onValueChange={handleChange(field)}
                  defaultValue={field.value}
               >
                  <FormControl>
                     <SelectTrigger className="w-auto">
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
                     {typeArray.map(([engType, spaType]) => {
                        ///   const [engType, spaType] = type
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
