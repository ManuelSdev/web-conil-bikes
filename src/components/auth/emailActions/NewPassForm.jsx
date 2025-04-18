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

const FormSchema = z
   .object({
      password: z.string().min(6, {
         message: 'La contraseña debe tener al menos 6 caracteres.',
      }),
      confirmPassword: z.string().min(6, {
         message: 'La contraseña debe tener al menos 6 caracteres.',
      }),
   })
   .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
         ctx.addIssue({
            code: 'custom',
            message: 'Las contraseñas no coinciden',
         })
      }
   })

export function NewPassForm({ onSubmit }) {
   const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         password: '',
         confirmPassword: '',
      },
   })

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-f space-y-6">
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nueva contraseña</FormLabel>
                     <FormControl>
                        <Input
                           type="password"
                           placeholder="shadcn"
                           className={
                              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                           }
                           {...field}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Confirmar contraseña</FormLabel>
                     <FormControl>
                        <Input
                           type="password"
                           placeholder="shadcn"
                           className={
                              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                           }
                           {...field}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button className="w-full" type="submit">
               Enviar correo de cambio de contraseña
            </Button>
         </form>
      </Form>
   )
}
