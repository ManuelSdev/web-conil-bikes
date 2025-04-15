// @ts-nocheck
'use client'
import React from 'react'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { CircleUserRound, Menu } from 'lucide-react'
import { Button } from '../ui/button'

export default function DrawerMenu({
   open,
   onOpenChange,
   sheetTitle,
   description,
   content,
   side,
   ...props
}) {
   //TODO: evita el auto-focus/focus-visible en el botón de eliminar cuando abres el drawer
   //desde el re login
   //https://github.com/radix-ui/primitives/discussions/935
   //https://hackmd.io/@y_G6JmAMTeKLZz2hPs2HHw/HkFjKQHP4
   //necesitas mandar el focus al botón de cerrar o de continuar

   return (
      <div>
         <Sheet open={open} onOpenChange={onOpenChange}>
            {/* <SheetTrigger>{trigger} aa</SheetTrigger>*/}
            <SheetContent
               onOpenAutoFocus={(ev) => console.log('ev -> ', ev)}
               className="lg:min-w-0 lg:max-w-sm"
               side={side}
            >
               <SheetHeader>
                  <SheetTitle>{sheetTitle}</SheetTitle>
                  {description && (
                     <SheetDescription>{description}</SheetDescription>
                  )}
                  {content}
               </SheetHeader>

               {/* <SheetFooter>
                  <SheetClose asChild>
                     <Button>Save changes</Button>
                  </SheetClose>
   </SheetFooter>*/}
            </SheetContent>
         </Sheet>
      </div>
   )
}
