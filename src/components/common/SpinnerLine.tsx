// @ts-nocheck
import React from 'react'

export default function SpinnerLine() {
   return (
      <div className="w-full">
         <div className="h-1.5 w-full overflow-hidden bg-red-100">
            <div className="animate-progress h-full w-full origin-[0%_100%] bg-gray-500"></div>
         </div>
      </div>
   )
}
