// @ts-nocheck
//@ts-nocheck
import React from 'react'
import { Instagram, Twitter, Facebook } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Social({ className, iconClassName }) {
   return (
      <div className={cn('flex justify-evenly', className)}>
         {[Instagram, Twitter, Facebook].map((Icon, index) => (
            <Icon
               key={index}
               className={cn('h-6 w-6', iconClassName)}
               color="#D5FF40"
               //   fill="red"
            />
         ))}
      </div>
   )
}
