//@ts-nocheck
import React from 'react'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import SpinnerRing from './SpinnerRing'

export default function AlertDialogLoader({ open, onOpenChange }) {
   return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
         <AlertDialogTrigger className="hidden">Open</AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader className="hidden">
               <div className={'mx-auto'}>
                  <SpinnerRing />
               </div>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="hidden">
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
