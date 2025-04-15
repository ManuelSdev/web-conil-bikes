// @ts-nocheck
'use client'
import { Button } from '@/components/ui/button'
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function DialogWindow({
   open,
   onOpenChange,
   title,
   description,
   actionText,
   closeText,
   handleAction,
}) {
   return (
      <Dialog
         //   defaultOpen={true}
         open={open}
         onOpenChange={onOpenChange}
      >
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
               {closeText && (
                  <DialogClose asChild>
                     <Button type="button" variant="secondary">
                        {closeText}
                     </Button>
                  </DialogClose>
               )}
               {actionText && (
                  <Button
                     onClick={handleAction}
                     type="button"
                     variant="secondary"
                  >
                     {actionText}
                  </Button>
               )}
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
