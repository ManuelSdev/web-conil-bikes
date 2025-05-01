// @ts-nocheck
'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
   selectAppIsLoadingData,
   selectAppIsLoadingPage,
} from '@/lib/redux/slices/appConfigSlice'
import { useSelector } from 'react-redux'
import BikeWheel from '../svg/BikeWheel'
import SpinnerRing from './SpinnerRing'

export function GlobalDialogLoader({ open, onOpenChange, spinner = true }) {
   const isLoadingData = useSelector(selectAppIsLoadingData)
   const isLoadingPage = useSelector(selectAppIsLoadingPage)
   console.log('isLoadingData ->', isLoadingData)
   console.log('isLoadingPage ->', isLoadingPage)
   return (
      <Dialog
         //   defaultOpen={true}
         open={isLoadingData || isLoadingPage}
         onOpenChange={onOpenChange}
      >
         <DialogContent
            closeIcon={false}
            className="border-0 bg-transparent shadow-none duration-0 focus:outline-none focus-visible:outline-none sm:max-w-md"
         >
            <div className={'mx-auto'}>
               {spinner ? <SpinnerRing /> : <BikeWheel />}
            </div>
         </DialogContent>
      </Dialog>
   )
}
