// @ts-nocheck
'use client'

import OrderCard from '@/components/a/OrderCard'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export function ToastDemo() {
   const { toast } = useToast()

   return (
      <Button
         variant="outline"
         onClick={() => {
            toast({
               className: 'h-[500px] holi bg-red-400',
               title: <div className="h-[100px]  bg-green-400">aaaaaaaa</div>,
               description: <div className="h-[100px]  bg-red-400"></div>,
               action: (
                  <ToastAction altText="Goto schedule to undo">
                     Undo
                  </ToastAction>
               ),
               viewport: <div></div>,
            })
         }}
      >
         Add to calendar
      </Button>
   )
}
