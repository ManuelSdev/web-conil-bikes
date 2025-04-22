// @ts-nocheck
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import next from 'next'
import { CustomLink } from '../common/CustomLink'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function StepControls(props) {
   //console.log('pageControl page', page)
   //console.log('prevUrl', prevUrl)
   return (
      <div className="mx-auto mt-10 max-w-xs">
         {props.prevUrl ? (
            <div className="mt-4 flex justify-evenly gap-5">
               <PrevButton {...props} />
               <NextButon {...props} />
            </div>
         ) : (
            <div className="mt-4 flex">
               <NextButon {...props} />
            </div>
         )}
      </div>
   )
}

function NextButon({ nextUrl, prevUrl, nextIsDisabled }) {
   return nextIsDisabled ? (
      <Button
         disabled
         variant="custom"
         className={prevUrl ? 'w-[45%] grow' : 'grow'}
      >
         Siguiente <ArrowRight weight="bold" className="ml-2 h-4 w-4" />
      </Button>
   ) : (
      <Button
         disabled
         asChild
         variant="custom"
         className={prevUrl ? 'w-[45%] grow' : 'grow'}
      >
         <CustomLink href={nextUrl}>
            Siguiente <ArrowRight weight="bold" className="ml-2 h-4 w-4" />
         </CustomLink>
      </Button>
   )
}

function PrevButton({ prevUrl, prevIsDisabled }) {
   return (
      <Button
         //   hidden={!prevUrl}
         disabled={prevIsDisabled}
         asChild
         variant="custom"
         className="w-[45%] grow"
      >
         <Link href={prevUrl}>
            {' '}
            <ArrowLeft weight="bold" className="mr-2 h-4 w-4" />
            Atrás{' '}
         </Link>
      </Button>
   )
}
