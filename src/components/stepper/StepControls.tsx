// @ts-nocheck
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function StepControls({
   page,
   nextIsActive,
   renderNextButton,
   renderPrevButton,
}) {
   const nextpage = () => {
      if (page === 'date') {
         return 'bikes'
      }
      if (page === 'bikes') {
         return 'address'
      }
      if (page === 'address') {
         return 'resume'
      }
   }

   const prevpage = () => {
      if (page === 'bikes') {
         return 'date'
      }
      if (page === 'address') {
         return 'bikes'
      }
      if (page === 'resume') {
         return 'address'
      }
   }

   //console.log('pageControl page', page)
   const BUTTON_CN = 'mt-4'

   return (
      <div className="mx-auto mt-10 max-w-xs ">
         {renderPrevButton ? (
            <div className="mt-4 flex justify-evenly gap-5">
               {renderPrevButton('grow w-[45%]  ')}
               {renderNextButton('grow w-[45%]  ')}
            </div>
         ) : (
            <div className="mt-4 flex">{renderNextButton('grow ')}</div>
         )}
      </div>
   )
}
