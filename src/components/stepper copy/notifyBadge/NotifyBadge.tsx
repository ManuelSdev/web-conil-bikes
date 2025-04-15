// @ts-nocheck
//https://flowbite.com/docs/components/badge/#notification-badge
import { cn } from '@/utils/functions'
import React from 'react'

export default function NotifyBadge({ className, ...props }) {
   return (
      <button
         className={cn(
            'relative inline-flex items-center rounded-lg bg-blue-500 p-3 text-center text-sm font-medium text-white hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
            className
         )}
         {...props}
      />
   )
}
