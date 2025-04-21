//@ts-nocheck
'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import RangeSelect from './RangeSelect'
import SizeSelect from './SizeSelect'
import TypeSelect from './TypeSelect'

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
   loadedSearchKeys,
   typesQuery,
   rangesMutation,
   ...props
}) {
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

   const { size, type, range } = form.watch()

   const [
      triggerType,
      {
         data: availableTypes,
         isFetching: isLoadingTypes,
         isSuccess: isSuccessTypes,
         unsubscribe: unsubscribeTypes,
      },
      lastPromiseInfoTypes,
   ] = typesQuery

   const [
      triggerRange,
      { data: availableRanges, isLoading: isLoadingRange, reset: resetRanges },
   ] = rangesMutation

   /* Uso la mutation en lugar de la query porque la query no tiene reset
   const [
      triggerRange,
      { data, isFetching: isLoadingRange, originalArgs },
      lastPromiseInfoRanges,
   ] = useLazyGetAvailableRangesQuery()
    */

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
               // className="sm:grow"
               className="space-y-2"
               form={form}
               selectedSize={size}
               handleChange={handleSizeChange}
               availableSizes={availableSizes}
               {...props}
            />
            <TypeSelect
               // className="sm:grow"
               className="sm:min-w-[100px]"
               form={form}
               handleChange={handleType}
               isLoadingTypes={isLoadingTypes}
               availableTypes={availableTypes}
               {...props}
            />
            <RangeSelect
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
                  <ShowBikesButton
                     size={size}
                     type={type}
                     range={range}
                     {...props}
                  />
               </div>
            </div>
         </form>
      </Form>
   )
}

function ShowBikesButton({ size, type, range, isFetchingBikes, onDispatch }) {
   console.log('range', range)
   return isFetchingBikes ? (
      <Button variant="reverse" className="grow">
         <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cargando...
      </Button>
   ) : (
      <Button
         variant="reverse"
         className="grow"
         onClick={() => onDispatch({ size, type, range })}
         disabled={!range}
         //type="submit"
      >
         <Search className="mr-2 h-4 w-4" />
         Mostrar bicicletas
      </Button>
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
