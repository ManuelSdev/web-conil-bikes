// @ts-nocheck
import { cn } from '@/utils/functions'

export default function Paper({ className, children }) {
   return (
      <div
         className={cn('overflow-hidden rounded-lg bg-white shadow', className)}
      >
         {children}
      </div>
   )
}
