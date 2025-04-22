// @ts-nocheck
'use client'
import DatePicker from '@/components/datepicker/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import {
   bikesReseted,
   dateRangeSelected,
   selectBikes,
   selectDateRange,
} from '@/lib/redux/slices/bookingFormSlice'
const FROM = 'from'
const TO = 'to'

export default function DatePickersHandler({
   //handleSelect,
   storedDateRange,
   ...props
}) {
   const today = new Date()
   const nextDay = new Date(today)
   nextDay.setDate(today.getDate() + 1)
   const dispatch = useDispatch()
   const nextYear = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
   )
   const { from, to } = storedDateRange
   const { from: isoFrom, to: isoTo } = storedDateRange

   const selectedFrom = from ? new Date(from) : ''
   console.log('selectedFrom', selectedFrom)
   const selectedTo = new Date(to)
   const selectedFromNextDay = from
      ? new Date(selectedFrom.setDate(selectedFrom.getDate() + 1))
      : today
   const selectedFromPrevDay = new Date(
      selectedTo.setDate(selectedTo.getDate() - 1)
   )
   const handleSelect = (picker: string) => (selectedDate: DateRange) => {
      console.log('picker', picker)
      console.log('selectedDate', selectedDate)
      const selectedDaterange = {
         ...storedDateRange,
         [picker]: selectedDate.toISOString(),
      }
      console.log('selectedDaterange', selectedDaterange)
      // const isoStringRangeObj = dateRangeObjToISOStringObj(newDateRangeObj)
      dispatch(dateRangeSelected(selectedDaterange))
   }
   //TODO: crea customDay para señañar el dia seleccionado en to y from
   return (
      <div className="grow justify-center gap-5">
         <div className="flex w-full justify-between gap-5 py-3 md:justify-center">
            <DatePicker
               //className="grow md:w-1/3 md:grow-0"
               className={'w-[45%] grow'}
               label="Inicio"
               date={from}
               handleSelect={handleSelect(FROM)}
               disabled={[
                  { before: nextDay },
                  { after: to ? selectedFromPrevDay : nextYear },
               ]}
               {...props}
            />
            <DatePicker
               // className="grow md:w-1/3  md:grow-0"
               disabled={[
                  { before: from ? selectedFromNextDay : today },
                  { after: nextYear },
               ]}
               className={'w-[45%] grow'}
               label="Fin"
               date={to}
               handleSelect={handleSelect(TO)}
               //selected={selected}
               {...props}
            />
         </div>
         {/*!linkDisabled ? (
            <Link
               disabled
               href="/booking/bikes"
               className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
               Continuarse
            </Link>
         ) : (
            <button
               disabled
               className="mt-8 block w-full rounded-md border border-transparent bg-red-300 px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
               {' '}
               Continuar
            </button>
         )*/}
      </div>
   )
}

/*<MobileBottomAppBar {...props} />*/
