// @ts-nocheck
import React from 'react'
import Link from 'next/link'
import GoogleLocation from './GoogleLocation'
import Social from './Social'
import Container from './Container'
import CorpName from '@/components/svg/CorpName'
import { cn } from '@/lib/utils'

export default function FooterDesktop({ navigation, contact, social }) {
   return (
      <div className="hidden sm:block">
         <Container>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-9">
               {/* Primer bloque */}
               <div>
                  <div>
                     <CorpName
                        className="w-full max-w-[1000px] fill-[#D5FF40] stroke-white"
                        viewBox="0 0 654 97"
                     />
                  </div>
                  <div className="mt-7 hidden md:block">
                     <Social />
                  </div>
               </div>

               {/* Segundo bloque */}
               <div className="col-span-2 grid gap-3 md:hidden">
                  <div className="col-start-2">
                     <Social />
                  </div>
               </div>

               {/* Tercer bloque */}
               <div className="col-span-3">
                  <div className="mt-5 grid grid-cols-3 text-white md:mt-0">
                     {navigation.map((item, index) => (
                        <div
                           key={index}
                           className={cn(
                              item.props?.className // Si hay clases adicionales en los props
                           )}
                        >
                           <div>
                              <div className="pb-2 text-lg font-semibold">
                                 {item.title}
                              </div>
                              {item.subtitles.map((subtitle, index) => (
                                 <div key={index}>
                                    {subtitle.href ? (
                                       <Link href={subtitle.href}>
                                          {subtitle.name}
                                       </Link>
                                    ) : (
                                       <div>{subtitle.name}</div>
                                    )}
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                     <div className="col-span-3">
                        <GoogleLocation className="mt-3" />
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   )
}

function icons() {
   return <div className="col-span-2">icons</div>
}
/**
info de contacto con iconos
<div>
                  {contact.map((item, index) => (
                     <div key={index} className="flex">
                        <item.icon {...item.iconProps} />
                        <div className="ml-3">{item.text}</div>
                     </div>
                  ))}
               </div> 

 */
/*
<div
                        className={cn(
                           'col-span-2 md:col-span-3 ',
                           ' pl-8  md:pl-16'
                        )}
                     >
                        <GoogleLocation className="mt-3" />
                     </div>
                     */
