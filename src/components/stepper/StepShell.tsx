// @ts-nocheck
import React from 'react'
import { Separator } from '../ui/separator'

export default function StepShell({ children, title, description }) {
   return (
      <div className="rounded-lg bg-gray-100 p-10">
         {/*<div className="pb-10">{ <StepsPanel step={step} />}</div>*/}
         <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
         <p className="text-muted-foreground">{description}</p>
         <Separator className="my-4" />
         {/* <div className="flex flex-col space-y-8 sm:flex-row sm:space-x-24 sm:space-y-0"> */}
         {children}
      </div>
   )
}
