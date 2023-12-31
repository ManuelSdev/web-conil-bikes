import DatePicker from '@/components/datepicker/DatePicker'
import MobileBottomAppBar from '@/components/layouts/site/MobileBottomAppBar'
import React from 'react'

const FROM = 'from'
const TO = 'to'

export default function DateStep({ from, to, handleSelect, ...props }) {
   return (
      <div>
         <div>
            <DatePicker date={from} handleSelect={handleSelect(FROM)} />
            <DatePicker date={to} handleSelect={handleSelect(TO)} />
         </div>
         <MobileBottomAppBar {...props} />
      </div>
   )
}
