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
import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import useFirebaseAuth from '@/lib/firebase/client/useFirebaseAuth'

import GoogleIcon from '@/components/svg/GoogleIcon'

const FormSchema = z.object({
   username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
   }),
})

export function SignInForm() {
   const { doSignInWithEmailAndPassword, doSignInWithRedirect } =
      useFirebaseAuth()
   /*
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   })
*/
   const form = useForm({
      // resolver: zodResolver(FormSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })
   /*
   function onSubmit(data: z.infer<typeof FormSchema>) {
     //console.log('data ->', data)
      toast({
         title: 'You submitted the following values:',
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">
                  {JSON.stringify(data, null, 2)}
               </code>
            </pre>
         ),
      })
   }
*/

   async function onSubmit(data, event) {
      //console.log('data ->', data)
      ////console.log('ev ->', ev)
      event.preventDefault()
      const { email, password } = data
      try {
         await doSignInWithEmailAndPassword({ email, password })
      } catch (error) {
         //handleOpen(error)
         //console.log('doSignInWithEmailAndPassword ERROR -> ', error)
      }
      toast({
         title: 'You submitted the following values:',
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">
                  {JSON.stringify(data, null, 2)}
               </code>
            </pre>
         ),
      })
   }

   const a = () =>
      toast({
         title: 'You submitted the following values:',
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
               Iniciar sesión
            </Button>
            <Button onClick={doSignInWithRedirect} className={'w-full'}>
               <GoogleIcon className="mr-2 h-6 w-6" />
               INICIAR SESIÓN CON GOOGLE
            </Button>
         </form>
      </Form>
   )
}
