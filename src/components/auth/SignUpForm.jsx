'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'

const FormSchema = z
   .object({
      name: z.string().min(2, {
         message: 'Username must be at least 2 characters.',
      }),
      phone: z.string().min(9, {
         message: 'El teléfono debe tener al menos 9 cifras',
      }),
      email: z.string().email(),
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

export function SignUpForm({ onSubmit }) {
   const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: '',
         phone: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
   })
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-f space-y-6">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nombre completo</FormLabel>
                     <FormControl>
                        <Input placeholder="shadcn" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="phone"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Teléfono</FormLabel>
                     <FormControl>
                        <Input placeholder="shadcn" {...field} />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
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
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Contraseña</FormLabel>
                     <FormControl>
                        <Input
                           type="password"
                           placeholder="shadcn"
                           className={
                              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6'
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
                              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6'
                           }
                           {...field}
                        />
                     </FormControl>

                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button className="w-full" type="submit">
               Crear cuenta
            </Button>
         </form>
      </Form>
   )
}
