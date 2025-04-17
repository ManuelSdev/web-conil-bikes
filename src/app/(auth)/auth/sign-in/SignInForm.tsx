//@ts-nocheck
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

import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import useFirebaseAuth from '@/lib/firebase/client/useFirebaseAuth'

import GoogleIcon from '@/components/svg/GoogleIcon'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
   username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
   }),
})

export function SignInForm({ onSubmit }) {
   const form = useForm({
      // resolver: zodResolver(FormSchema),
      defaultValues: {
         email: '',
         password: '',
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
                     <FormLabel>Email</FormLabel>
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
            <Button className="w-full" type="submit">
               Iniciar sesión
            </Button>
         </form>
      </Form>
   )
}
