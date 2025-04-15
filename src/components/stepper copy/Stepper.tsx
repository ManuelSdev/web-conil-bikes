// @ts-nocheck
import React from 'react'

import StepsPanel from './StepsPanel'
import StepVertical from './StepVertical'

import { cn } from '@/utils/functions'

export default function Stepper({
   step,
   children,
   title,
   info,
   page,
   nextButton,
   prevButton,
   childClassName,
   isAdmin,
}) {
   //console.log('Stepper @@@->')
   return (
      <div className="flex flex-col space-y-8 sm:space-y-0">
         <div className="sm:hidden">
            <StepVertical step={step} isAdmin={isAdmin} />
         </div>
         <div className="hidden sm:block">
            <StepsPanel step={step} isAdmin={isAdmin} />
         </div>

         <div className={cn('sm:mx-auto sm:w-1/2', childClassName)}>
            <div className={cn({ 'mt-8': !title })}>{children}</div>
         </div>
      </div>
   )
}
/*
 <div class="space-y-0.5">
            <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
            <p class="text-muted-foreground">
               Manage your account settings and set e-mail preferences.
            </p>
         </div>
         <div className="flex-1 lg:max-w-2xl">
            <div className="space-y-6"></div>
         </div>
         <div className="">{children}</div>
         */
