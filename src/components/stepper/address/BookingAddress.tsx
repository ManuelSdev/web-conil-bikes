// @ts-nocheck

import StepControls from '@/components/stepper/StepControls'
import { BookingAddressForm } from './BookingAddressForm'

export default function BookingAddress({ form, address, nextUrl, prevUrl }) {
   return (
      <div>
         <BookingAddressForm form={form} />
         <StepControls
            nextUrl={nextUrl}
            prevUrl={prevUrl}
            nextIsDisabled={!address}
         />
      </div>
   )
}
