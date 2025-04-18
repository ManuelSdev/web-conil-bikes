import React, { Children } from 'react'

import SpinnerRing from '../common/SpinnerRing'
//import main from '@/public/main.jpg'
export default function AuthFormCard({
   isAdmin,
   label,
   children,
   renderCheckbox,
   renderSubmitButton,
   renderGoogleButton,
   renderOptionalLinkLeft,
   renderOptionalLinkRight,
   isLoading,
}) {
   const optionalLinkProps = {
      className: 'font-semibold text-indigo-600 hover:text-indigo-500',
   }
   const buttonProps = {
      className: 'w-full',
   }
   return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
         <h2 className="mb-6 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
            {label}
         </h2>

         <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            {isLoading ? (
               <SpinnerRing />
            ) : (
               <div>
                  {children}
                  {/*renderCheckbox()*/}
                  {/*renderSubmitButton(buttonProps)*/}

                  {(renderOptionalLinkLeft || renderOptionalLinkRight) && (
                     <div className="mt-4 flex items-center justify-between">
                        {renderOptionalLinkLeft && (
                           <div className="text-sm leading-6">
                              {renderOptionalLinkLeft(optionalLinkProps)}
                           </div>
                        )}

                        {renderOptionalLinkRight && (
                           <div className="text-sm leading-6">
                              {renderOptionalLinkRight(optionalLinkProps)}
                           </div>
                        )}
                     </div>
                  )}
                  {renderGoogleButton && (
                     <div>
                        <div className="relative mt-10">
                           <div
                              className="absolute inset-0 flex items-center"
                              aria-hidden="true"
                           >
                              <div className="w-full border-t border-gray-200" />
                           </div>
                           <div className="relative flex justify-center text-sm leading-6 font-medium">
                              <span className="bg-white px-6 text-gray-900">
                                 O inicia sesión con tu cuenta de Google
                              </span>
                           </div>
                        </div>

                        <div className="mt-6">
                           {renderGoogleButton(buttonProps)}
                        </div>
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}
