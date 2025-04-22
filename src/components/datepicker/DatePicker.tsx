// @ts-nocheck
'use client'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { es } from 'date-fns/locale'
import { useState } from 'react'

export default function DatePicker({
   date,
   areBikes,
   fnSelect,
   label,
   className,
   isDisabled,
   disabled,
   selected: el,
}) {
   const [open, setopen] = useState(false)

   const onSelect = (selectedDate) => {
      fnSelect(selectedDate)
      setopen(false)
   }
   const today = new Date()
   const nextYear = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
   )

   return (
      <Popover onOpenChange={setopen} open={open}>
         <PopoverTrigger asChild>
            <Button
               disabled={areBikes}
               variant={'outline'}
               className={cn(
                  //    'w-[280px] ',
                  'justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                  className
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {date ? format(date, 'dd/MM/yyyy') : <span>{label}</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
               disabled={disabled}
               locale={es}
               mode="single"
               selected={date}
               //el={el}
               /*
               components={{
                  Day: CustomDay,
                  // CaptionLabel: CustomCaptionLabel
                  // Row: CustomRow,
               }}
                  */
               onSelect={onSelect}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   )
}

function CustomDay({ date, displayMonth, ...props }) {
   return (
      <Button
         className={cn(
            'h-9 w-9 p-0 font-normal',
            'focus-within:relative focus-within:z-20',
            isSelected && 'bg-primary text-primary-foreground',
            isDisabled && 'text-muted-foreground opacity-50'
         )}
         disabled={isDisabled}
         onClick={() => el(date)}
      >
         {format(date, 'd')}
      </Button>
   )
}
