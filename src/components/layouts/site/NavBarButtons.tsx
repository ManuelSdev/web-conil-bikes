// @ts-nocheck
'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'

const navigation = [
   { name: 'Inicio', href: '/', pathname: '/' },
   {
      name: 'Alquiler',
      href: '/booking/date',
      pathname: ['/user/booking', '/booking'],
   },
   { name: 'Tienda', href: '/store', pathname: ['/store'] },
   { name: 'Servicios', href: '/services', pathname: ['/services'] },
   { name: 'Contacto', href: '/contact', pathname: ['contact'] },
]

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}
const str = 'b/a'
//console.log(['a', 'b', 'c'].some((item) => str.includes(item)))
console.log(['/a'].includes('/'))
const contains = (str, arr) => arr.some((item) => str.includes(item))

export default function NavBarButtons() {
   const [isCurrent, setIsCurrent] = useState()
   const pathname = usePathname()
   //console.log('pathname', pathname)
   return (
      <div className="BUTTONS hidden md:block">
         <div className="h-slimTopAppBar md:h-fatTopAppBar hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
               <a
                  key={item.name}
                  href={item.href}
                  className={clsx({
                     'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium':
                        true,

                     'border-greenCorp text-greenCorp':
                        item.pathname === '/'
                           ? item.pathname === pathname
                           : contains(pathname, item.pathname),
                     'text-greenCorp border-transparent hover:border-gray-100 hover:text-gray-100':
                        item.pathname === '/'
                           ? item.pathname !== pathname
                           : !contains(pathname, item.pathname),
                  })}
                  aria-current={item.pathname ? 'page' : undefined}
               >
                  {item.name}
               </a>
            ))}
         </div>
      </div>
   )
}
