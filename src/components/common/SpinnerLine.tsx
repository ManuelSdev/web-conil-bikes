// @ts-nocheck
import React from 'react'

export default function SpinnerLine() {
   return (
      <div className="w-full">
         <div className="h-1.5 w-full overflow-hidden bg-gray-100">
            <div className="h-full w-full origin-left-right animate-progress bg-gray-500"></div>
         </div>
      </div>
   )
}
