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
import SpinnerRing from './SpinnerRing'
import BikeWheel from '../svg/BikeWheel'

export function DialogLoader({ open, onOpenChange, spinner = false }) {
   return (
      <Dialog
         //   defaultOpen={true}
         open={open}
         onOpenChange={onOpenChange}
      >
         <DialogContent
            closeIcon={false}
            className="border-0 bg-transparent shadow-none duration-0 focus:outline-none	focus-visible:outline-none sm:max-w-md"
         >
            <div className={'mx-auto'}>
               {spinner ? <SpinnerRing /> : <BikeWheel />}
            </div>
         </DialogContent>
      </Dialog>
   )
}
