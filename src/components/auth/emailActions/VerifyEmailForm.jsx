'use client'

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
import { Input } from '@/components/ui/input'
import React from 'react'

const FormSchema = z.object({
   email: z.string().email(),
})

export function VerifyEmailForm({ onSubmit }) {
   const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         email: '',
      },
   })

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-f space-y-6">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Correo eléctronico</FormLabel>
                     <FormControl>
                        <Input placeholder="shadcn" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button className="w-full" type="submit">
               Enviar correo de verificación
            </Button>
         </form>
      </Form>
   )
}
