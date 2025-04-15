// @ts-nocheck
import React from 'react'

export default function BikeCardSkeleton() {
   return (
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
         {/* Product */}
         {/*<div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">*/}
         <div className="sm:grid sm:grid-cols-7 sm:grid-rows-1 sm:gap-x-8 sm:gap-y-10 xl:gap-x-16">
            {/* Product image */}
            <div className="sm:col-span-4 sm:row-end-1">
               <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-red-100"></div>
            </div>

            {/* Product details */}
            <div className="mx-auto mt-7 max-w-2xl  sm:col-span-3 sm:row-span-2 sm:row-end-2 sm:mt-0 md:max-w-none">
               <div className="flex flex-col-reverse">
                  <div className="">
                     <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Model brand model name
                     </h1>

                     <h2 id="information-heading" className="sr-only">
                        Product information
                     </h2>
                  </div>
               </div>

               <p className="mt-6 text-gray-500"> {'modelDesc'}</p>

               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  {/* <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
             >
                Pay {product.price}
             </button>*/}
               </div>
            </div>
         </div>
      </div>
   )
}
