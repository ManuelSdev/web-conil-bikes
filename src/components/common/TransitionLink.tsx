// @ts-nocheck
'use client'

import { useEffect, useTransition } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { GlobalDialogLoader } from './GlobalDialogLoader'
import { useDispatch } from 'react-redux'
import { appIsloadingData } from '@/lib/redux/slices/appConfigSlice'

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
export function TransitionLink({ href, children, replace, ...rest }) {
   const router = useRouter()
   const [isPending, startTransition] = useTransition()
   const dispatch = useDispatch()
   console.log('isPending ->', isPending)

   if (isPending) {
      // return <>Pending navigation</>
   }
   useEffect(() => {
      isPending && dispatch(appIsloadingData(isPending))

      return () => {
         dispatch(appIsloadingData(false))
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
