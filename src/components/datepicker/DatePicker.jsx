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
import { cn } from '@/utils/app/functions'
import { useState } from 'react'
export default function DatePicker({ date, handleSelect }) {
   const [open, setopen] = useState(false)
   const onSelect = (selectedDate) => {
      handleSelect(selectedDate)
      setopen(false)
   }
   return (
      <Popover onOpenChange={setopen} open={open}>
         <PopoverTrigger asChild>
            <Button
               variant={'outline'}
               className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
               mode="single"
               selected={date}
               onSelect={onSelect}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   )
}
