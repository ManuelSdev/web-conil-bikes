// @ts-nocheck
import { BIKE_RANGES_MAP, BIKE_TYPES_MAP } from '@/utils/appValues'
import React from 'react'

import { add, format } from 'date-fns'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import { cn } from '@/utils/functions'
/*
import {
   UserCircle,
   Envelope,
   Phone,
   MapPin,
   Bicycle,
   ArrowRight,
   ArrowUDownLeft,
} from '@phosphor-icons/react'
import {
   CheckIcon,
   ClockIcon,
   QuestionMarkCircleIcon,
   XMarkIcon,
} from '@heroicons/react/20/solid'

import {
   CalendarDaysIcon,
   CreditCardIcon,
   UserCircleIcon,
} from '@heroicons/react/20/solid'
 */
import {
   Check as CheckIcon,
   Clock as ClockIcon,
   HelpCircle as QuestionMarkCircleIcon,
   X as XMarkIcon,
   Calendar as CalendarDaysIcon,
   CreditCard as CreditCardIcon,
   User as UserCircleIcon,
   Mail as Envelope,
   Phone,
   MapPin,
   Bike as Bicycle,
   ArrowRight,
   CornerDownLeft as ArrowUDownLeft,
} from 'lucide-react'
import { CalendarDays } from 'lucide-react'
export default function BookingResume({
   name,
   phone,
   email,
   address,
   delivery,
   pickup,
   bikesByUnits,
   dateRange,
   dayPrice,
   bookingPrice,
   duration,
   renderSubmitButton,
   renderPrevButton,
}) {
   const { from, to } = dateRange
   console.log('dateRange en Bookingresume ->', dateRange)
   return (
      <div className="bg-gray-100">
         <div className="mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
               Resumen
            </h3>

            <div></div>

            <form className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
               <div className="mt-12 lg:col-span-7">
                  <Bikes bikes={bikesByUnits} />
               </div>
               <div className="bg-red lg:col-span-5 lg:mt-12">
                  {/* Order summary */}
                  <Details
                     name={name}
                     email={email}
                     phone={phone}
                     address={address}
                     dateRange={dateRange}
                     delivery={delivery}
                     pickup={pickup}
                  />

                  <Price
                     dayPrice={dayPrice}
                     bookingPrice={bookingPrice}
                     duration={duration}
                  />
                  <div className="mt-12">
                     <div className="mx-auto flex flex-col gap-5 lg:px-6">
                        {renderSubmitButton(' grow')}
                        {renderPrevButton(' grow')}
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

function Bikes({ bikes }) {
   return (
      <section aria-labelledby="cart-heading" className="p-6 lg:p-0 lg:pt-8">
         <h2 id="cart-heading" className="sr-only">
            Bicicletas en tu reserva
         </h2>

         <h4
            id="cart-heading"
            className="mb-6 text-lg font-medium text-gray-900"
         >
            Bicicletas
         </h4>
         <ul
            role="list"
            className="divide-y divide-gray-200 border-t border-b border-gray-200"
         >
            {bikes.map((bike, idx) => (
               <li key={idx} className="flex py-6 sm:py-7">
                  {/*  <div className="flex-shrink-0">
               <img
                  src={bike.modelImages[0]}
                  alt={'bike.imageAlt'}
                  className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  // className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
               />
      </div>*/}
                  <div className="relative h-[100px] w-[100px] bg-[#F1F1F1] sm:h-[150px] sm:w-[200px]">
                     <Image
                        src={bike.modelImages[0]}
                        alt={bike.imageAlt}
                        fill
                        style={{
                           objectFit: 'contain',
                        }}
                        quality={100}
                        //width={'50%'}
                        //  className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                     />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                     <div>
                        <div className="flex justify-between">
                           <h4 className="text-sm">
                              <p className="font-medium text-gray-700 hover:text-gray-800">
                                 {`${bike.modelBrand} ${bike.modelName}`}
                              </p>
                           </h4>
                           <p className="ml-4 text-sm font-medium text-gray-900">
                              {
                                 bike.price
                                 // handleBikePrice(bike)
                              }{' '}
                              €/día
                           </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                           Tipo: {BIKE_TYPES_MAP[bike.modelType]}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                           Gama: {BIKE_RANGES_MAP[bike.modelRange]}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                           Talla: {bike.bikeSize}
                        </p>
                     </div>

                     {/* <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                           {true ? (
                              // product.inStock
                              <CheckIcon
                                 className="h-5 w-5 flex-shrink-0 text-green-500"
                                 aria-hidden="true"
                              />
                           ) : (
                              <ClockIcon
                                 className="h-5 w-5 flex-shrink-0 text-gray-300"
                                 aria-hidden="true"
                              />
                           )}

                           <span>
                              {true
                                 ? //  product.inStock
                                   'In stock'
                                 : `Will ship in $ {product.leadTime} `}
                           </span>
                        </p>
                        <div className="ml-4">
                           <button
                              type="button"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                           >
                              <span>Remove</span>
                           </button>
                        </div>
                     </div>*/}
                  </div>
               </li>
            ))}
         </ul>
      </section>
   )
}

function Details({ name, email, phone, address, dateRange, delivery, pickup }) {
   const items = [
      { label: 'Nombre', value: name, icon: UserCircle },
      { label: 'Email', value: email, icon: Envelope },
      { label: 'Teléfono', value: phone, icon: Phone },
      { label: 'Dirección', value: address, icon: MapPin },
      {
         label: 'Fecha de reserva',
         value:
            //Al crear la reserva, el extraReducer de bookingFormSlice resetea el estado
            //y peta todo al mostrar una date que es null, por eso se hace este ternario
            dateRange.from && dateRange.to
               ? `Del ${format(
                    new Date(dateRange.from),
                    'dd/MM/yyyy'
                 )} al ${format(new Date(dateRange.to), 'dd/MM/yyyy')}`
               : '',
         icon: CalendarDays,
      },
      {
         label: 'Entrega',
         value: delivery
            ? 'Entrega de bicicletas en tienda el día de inicio de la reserva'
            : 'Entrega de bicicletas a domicilio el día previo al inicio de la reserva',
         icon: ArrowRight,
      },
      {
         label: 'Recogida',
         value: pickup
            ? 'Devolución de bicicletas en tienda el último día de la reserva'
            : 'Recogida de bicicletas a domicilio el último día de la reserva',
         icon: ArrowUDownLeft,
      },
   ]
   return (
      <section
         aria-labelledby="summary-heading"
         className="mt-12 rounded-lg bg-gray-200 p-6 lg:mt-0 lg:p-8"
      >
         <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Detalles
         </h2>

         <dl className="mt-6 space-y-4">
            {items.map((item, idx) => (
               <div key={idx} className="mt-4 flex w-full flex-none gap-x-4">
                  <dt className="flex-none">
                     <span className="sr-only">Due date</span>
                     <item.icon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                     />
                  </dt>
                  <dd className="text-sm leading-6 text-gray-500">
                     <div>{item.value}</div>
                  </dd>
               </div>
            ))}
         </dl>
      </section>
   )
}
function Price({ dayPrice, bookingPrice, duration }) {
   const items = [
      { label: 'Precio por día', value: dayPrice + ' €' },
      { label: 'Duración de la reserva', value: duration + ' días' },
      { label: 'Precio total', value: bookingPrice + ' €' },
   ]
   return (
      <section
         aria-labelledby="summary-heading"
         className="mt-12 rounded-lg bg-gray-200 p-6 lg:col-span-5 lg:p-8"
      >
         <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
            Importe
         </h2>

         <dl className="mt-6 space-y-4">
            {items.map((item, idx) => (
               <div key={idx} className="flex items-center justify-between">
                  <dt
                     className={cn({
                        'text-sm text-gray-600': true,
                        'text-base font-medium': item.label === 'Precio total',
                     })}
                  >
                     {item.label}
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                     {item.value}
                  </dd>
               </div>
            ))}
         </dl>
      </section>
   )
}
