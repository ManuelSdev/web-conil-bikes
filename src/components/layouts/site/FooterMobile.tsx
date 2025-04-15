// @ts-nocheck
// @ts-nocheck
import React from 'react'
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import GoogleLocation from './GoogleLocation'

import Link from 'next/link'
import Social from './Social'
import Copyright from '@/components/Copyright'
import CorpName from '@/components/svg/CorpName'

export default function FooterMobile({ navigation }) {
   return (
      <div className="p-4">
         <div>
            <CorpName
               className={'w-full max-w-[1000px] fill-[#D5FF40] stroke-white'}
               viewBox={'0 0 654 97'}
            />
         </div>
         <Accordion type="single" collapsible>
            {navigation.map((item, index) => (
               <AccordionItem
                  className="text-white"
                  key={index}
                  value={`item-${index}`}
               >
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                     {item.subtitles.map((subtitle, index) =>
                        subtitle.href ? (
                           <div key={index}>
                              <Link href={subtitle.href}> {subtitle.name}</Link>
                           </div>
                        ) : (
                           <div key={index} className="flex gap-2">
                              <div>
                                 <subtitle.icon {...subtitle.iconProps} />
                              </div>
                              <div>{subtitle.name}</div>
                           </div>
                        )
                     )}
                     {item.googleMap && <GoogleLocation />}
                  </AccordionContent>
               </AccordionItem>
            ))}
         </Accordion>
         <Social className="mt-10" iconClassName="h-9 w-9" />
         <Copyright />
      </div>
   )
}
