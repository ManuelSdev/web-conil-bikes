// @ts-nocheck
'use client'

import { format } from 'date-fns'

import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
cn
import { useState } from 'react'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export default function DatePicker({
   date,
   handleSelect,
   label,
   className,
   isDisabled,
   disabled,
   selected: el,
}) {
   const [open, setopen] = useState(false)
   const onSelect = (selectedDate) => {
      handleSelect(selectedDate)
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
               disabled={isDisabled}
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
