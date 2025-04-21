// @ts-nocheck
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function BookingAddressForm({
   step,
   dateRange,
   form,
   onSubmit,
   renderNextButton,
}) {
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
               control={form.control}
               name="address"
               render={({ field }) => (
                  <FormItem className="">
                     <FormLabel>Dirección</FormLabel>
                     <FormControl>
                        <Input placeholder="Dirección" {...field} />
                     </FormControl>
                     <FormDescription>
                        Indica cual será tu dirección durante la reserva.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="delivery"
               render={({ field }) => (
                  <FormItem className="space-y-3">
                     <FormLabel>
                        ¿Recogerás las bicis en nuestra tienda o prefieres que
                        te las entreguemos en tu dirección?
                     </FormLabel>
                     <FormControl>
                        <RadioGroup
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                           className="flex flex-col space-y-1"
                        >
                           <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                 <RadioGroupItem value={false} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                 Recogida en tienda
                              </FormLabel>
                           </FormItem>
                           <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                 <RadioGroupItem value={true} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                 Entrega a domicilio
                              </FormLabel>
                           </FormItem>
                        </RadioGroup>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="pickup"
               render={({ field }) => (
                  <FormItem className="space-y-3">
                     <FormLabel>
                        Entrega de bicicletas al finalizar la reserva
                     </FormLabel>
                     <FormControl>
                        <RadioGroup
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                           className="flex flex-col space-y-1"
                        >
                           <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                 <RadioGroupItem value={false} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                 Entrega en tienda
                              </FormLabel>
                           </FormItem>
                           <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                 <RadioGroupItem value={true} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                 Recogida a domicilio
                              </FormLabel>
                           </FormItem>
                        </RadioGroup>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/*renderNextButton()*/}
            {/*<Button type="submit">Submit</Button>*/}
         </form>
      </Form>
   )
}
