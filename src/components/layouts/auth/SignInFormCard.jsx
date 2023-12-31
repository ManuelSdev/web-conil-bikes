import React, { Children } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import GoogleIcon from '@/components/svg/GoogleIcon'
//import main from '@/public/main.jpg'
export default function SignInFormCard({ isAdmin, label, children }) {
   return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
         <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {label}
         </h2>

         <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            {children}

            <div className="mt-4 flex items-center justify-between">
               <div className="text-sm leading-6">
                  <a
                     href="#"
                     className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                     ¿Olvidaste la contraseña?
                  </a>
               </div>

               {isAdmin || (
                  <div className="text-sm leading-6">
                     <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                     >
                        Crear cuenta
                     </a>
                  </div>
               )}
            </div>
            {isAdmin || (
               <div>
                  <div className="relative mt-10">
                     <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                     >
                        <div className="w-full border-t border-gray-200" />
                     </div>
                     <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white px-6 text-gray-900">
                           O inicia sesión con tu cuenta de Google
                        </span>
                     </div>
                  </div>

                  <div className="mt-6">
                     <Button className={'w-full'}>
                        <GoogleIcon className="mr-2 h-6 w-6" />
                        INICIAR SESIÓN CON GOOGLE
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
