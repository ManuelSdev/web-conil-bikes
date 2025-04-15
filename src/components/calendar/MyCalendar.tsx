// @ts-nocheck
'use client'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import clsx from 'clsx'
import { useState } from 'react'
//import './calendar.css'
//import styles from './styles.module.css'
import {
   Button,
   Calendar,
   CalendarGrid,
   Heading,
   Text,
} from 'react-aria-components'
import CustomCalendarCell from './CustomCalendarCell'

//TODO: falta el css del slot error
//From es la fecha inicial del rango de fechas que se pide al api

export default function MyCalendar({ errorMessage, ...props }) {
   const [from, setFrom] = useState(false)
   return (
      <Calendar
         onChange={(e) => console.log('onChange->', e)}
         //esto marca día actual
         value={today(getLocalTimeZone())}
         className={'w-fit max-w-full text-cyan-400'}
         {...props}
      >
         <header className="mx-1 mb-2 mt-0 flex items-center">
            <Cbutton slot="previous">◀</Cbutton>
            <Heading className="m-0 flex-1 text-center text-[1.375rem]" />
            <Cbutton slot="next">▶</Cbutton>
         </header>
         <CalendarGrid>
            {(date) => (
               //     //console.log(date) ||
               <CustomCalendarCell
                  className={clsx(
                     '-m-px w-8 cursor-default rounded-md border-2 border-solid border-transparent text-center leading-8 outline-none',
                     //Oculta días que no son del mes
                     //'data-[outside-month]:hidden',
                     'data-[pressed]:bg-gray-200',

                     'data-[focus-visible]:shadow-[0_0_0_2px_bg-orange-500]',
                     'data-[selected]:bg-orange-500',
                     'data-[selected]:text-white',
                     'data-[disabled]:text-gray-500',
                     'data-[unavailable]:line-through',
                     'data-[unavailable]:text-red-600',
                     'data-[invalid]:bg-red-950',
                     'data-[invalid]:text-white',
                     'text-green-700'
                  )}
                  date={date}
               />
            )}
         </CalendarGrid>
         {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
      </Calendar>
   )
}

const Cbutton = ({ slot, children }) => (
   <Button
      className={clsx(
         'h-8 w-8 p-0',
         'm-0 appearance-none rounded border border-solid  p-[0.4rem] text-center align-middle text-base  shadow-[0_1px_2px_rgba(0_0_0_/_0.1)] outline-none',
         'border-[red] bg-slate-500 text-[red]',
         'data-[focus-visible]:ring-slate-500',
         'data-[focus-visible]:shadow-[0_1px_2px_rgba(0_0_0_/_0.1)]',
         'data-[pressed]:bg-gray-200',
         'data-[disabled]:bg-slate-400',
         'data-[disabled]:text-gray-500'
      )}
      slot={slot}
   >
      {children}
   </Button>
)

const colors_Calendar = {
   highlighBackground: 'slateblue',
   highlighForeground: 'white',
   text: 'black',
   textDisabled: 'gray',
   textInvalid: 'gray',
   pressed: 'gray-200',
   unavailable: 'red-600',
   invalid: 'red-600',
   defaultBackground: 'gray-100',
   selected: '#highlighForeground',
}
