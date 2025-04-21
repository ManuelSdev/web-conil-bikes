// @ts-nocheck

import StepControls from '@/components/stepper/StepControls'
import BikeFiltersForm from './BikeFiltersForm'

export default function BikesStep(props) {
   return (
      <div>
         <BikeFiltersForm {...props} />
         <StepControls nextIsDisabled={!props.bikesQuantity} {...props} />
      </div>
   )
}
