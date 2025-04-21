// @ts-nocheck
import DatePicker from '@/components/datepicker/DatePicker'

const FROM = 'from'
const TO = 'to'

export default function DatePickersHandler({
   from,
   to,
   handleSelect,
   storedDateRange,
   ...props
}) {
   const today = new Date()
   const nextDay = new Date(today)
   nextDay.setDate(today.getDate() + 1)

   const nextYear = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
   )
   const { from: isoFrom, to: isoTo } = storedDateRange

   const selectedFrom = new Date(isoFrom)
   const selectedTo = new Date(isoTo)
   const selectedFromNextDay = new Date(
      selectedFrom.setDate(selectedFrom.getDate() + 1)
   )
   const selectedFromPrevDay = new Date(
      selectedTo.setDate(selectedTo.getDate() - 1)
   )
   console.log('nextDay -> ', from)
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
