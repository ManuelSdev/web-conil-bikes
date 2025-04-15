// @ts-nocheck
import { cn } from '@/utils/functions'
import React from 'react'

export default function NotifyBadgeNumber({ className, ...props }) {
   return (
      <div
         className={cn(
            'absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900',
            className
         )}
         {...props}
      />
   )
}
