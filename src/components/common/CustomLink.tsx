// @ts-nocheck
'use client'

import { useEffect, useTransition } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import SpinnerRing from './SpinnerRing'
import { useDispatch } from 'react-redux'
import { appIsloadingPage } from '@/lib/redux/slices/appConfigSlice'
import { Dialog, DialogContent } from '../ui/dialog'

/**
 * A custom Link component that wraps Next.js's next/link component.
 * https://github.com/vercel/next.js/discussions/41934#discussioncomment-8996669
 */
export function CustomLink({ href, children, replace, ...rest }) {
   const router = useRouter()
   const dispatch = useDispatch()
   const [isPending, startTransition] = useTransition()

   if (isPending) {
      //   return <SpinnerRing />
      /*
      return (
         <Dialog
            //   defaultOpen={true}
            open={true}
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
      */
   }
   useEffect(() => {
      isPending && dispatch(appIsloadingPage(true))
      console.log('isPending ->', isPending)
      return () => {
         // second
         isPending && dispatch(appIsloadingPage(false))
      }
   }, [isPending])

   return (
      <NextLink
         href={href}
         onClick={(e) => {
            e.preventDefault()
            startTransition(() => {
               const url = href.toString()
               if (replace) {
                  router.replace(url)
               } else {
                  router.push(url)
               }
            })
         }}
         {...rest}
      >
         {children}
      </NextLink>
   )
}
