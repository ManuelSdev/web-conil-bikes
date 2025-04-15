// @ts-nocheck
// @ts-nocheck
'use client'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { CircleUserRound, Menu, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NavBarButtons from './NavBarButtons'
import CorpName from '@/components/svg/CorpName'
import IconCorpLogo from '@/components/svg/IconCorpLogo'

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}

//console.log(<MapPin className="h-6 w-6" />)
export default function NavBar() {
   return (
      <header className="HEADER sticky top-0 z-40 w-full bg-black">
         <nav className="NAV mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="WRAPPER h-slimTopAppBar md:h-fatTopAppBar flex items-center justify-between gap-8">
               {/**LOGO Y BOTONERA +MD */}
               <div className="LEFT-BLOCK flex w-full items-center justify-between">
                  {/* LOGO */}
                  <div className="flex-shrink-0">
                     <div className="flex items-center">
                        <Button
                           size="icon"
                           className="md:hidden"
                           onClick={() => handleSetDialogLeft({ open: true })}
                        >
                           <Menu className="text-greenCorp" />
                        </Button>

                        <Link className="LOGO" href="/">
                           <IconCorpLogo className="h-12 w-12 border-2 md:h-20 md:w-20" />
                        </Link>
                     </div>
                  </div>

                  {/**BOTONERA +md */}
                  <NavBarButtons />
               </div>
               {/* BOTONERA/Profile +md*/}
               <div>
                  <div className="ml-4 flex items-center md:ml-6">
                     {/* <div className="">
                        <Button
                           className="text-greenCorp "
                           onClick={() => handleSetDialogRight({ open: true })}
                        >
                           <CircleUserRound
                              className="mr-2 h-6 w-6 "
                              //color="#D5FF40"
                              aria-hidden="true"
                           />
                           <span className="hidden md:block">
                              {' '}
                              Mi cuentsssa
                           </span>
                        </Button>
                     </div>*/}
                     {/*<HeaderCart />
                      */}
                  </div>
               </div>
            </div>
         </nav>
      </header>
   )
}

const navigation = [
   {
      name: 'Alquiler',
      href: '/booking/date',
      icon: CircleUserRound,
      pathname: ['/user/booking', '/booking'],
   },
   {
      name: 'Tienda',
      href: '/store',
      icon: CircleUserRound,
      pathname: ['/store'],
   },
   {
      name: 'Servicios',
      href: '/services',
      icon: CircleUserRound,
      pathname: ['/services'],
   },
   {
      name: 'Contacto',
      href: '/contact',
      icon: CircleUserRound,
      pathname: ['contact'],
   },
]
function AppNavigation() {
   return (
      <ul role="list" className="-mx-2 space-y-1">
         {navigation.map((item) => (
            <li key={item.name}>
               <Link href={item.href}>
                  <div className="flex gap-4 py-3">
                     <item.icon
                        className="h-6 w-6 shrink-0 text-gray-400"
                        aria-hidden="true"
                     />
                     {item.name}
                  </div>
               </Link>
            </li>
         ))}
      </ul>
   )
}
