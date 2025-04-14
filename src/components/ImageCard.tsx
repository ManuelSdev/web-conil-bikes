// @ts-nocheck
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
export default function ImageCard({ src, label, title, text, renderButton }) {
   return (
      <div className="bg-dark-c w-full rounded-[50px] shadow dark:border-gray-700 dark:bg-gray-800">
         <div className="relative h-[200px] w-full overflow-hidden min-[450px]:h-[300px]  lg:h-[200px]">
            <Image
               src={src}
               alt=""
               fill
               className="rounded-t-[50px] object-cover"
            />
            <div className="absolute bottom-3 left-3 z-30 w-fit border-4 border-solid border-gray-100 bg-black/50 p-3 text-white ">
               {label}
            </div>
         </div>

         <div className="bor p-5">
            {title && (
               <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                     {title}
                  </h5>
               </a>
            )}
            <p className="mb-3 font-normal text-gray-300 dark:text-gray-400">
               {text}
            </p>
            <div className="flex justify-center">
               {renderButton({
                  variant: 'custom',
                  // className: 'rounded-[50px]',
               })}
            </div>
         </div>
      </div>
   )
}
