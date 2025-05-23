// @ts-nocheck

import DatePickersHandler from './DatePickersHandler'
import StepControls from '../StepControls'
import { AlertDialogButton } from '@/components/common/AlertDialogButton'
import { cn } from '@/utils/functions'
//import { Link } from 'react-transition-progress/next'
// CLAVE import { ArrowRight } from '@phosphor-icons/react'

export default function DateStep(props) {
   const {
      storedDateRange: { from, to },
      areBikes,
      dispatchBikesReseted,
      nextUrl,
   } = props

   return (
      <div className={'mx-auto max-w-xs'}>
         {/*<DialogLoader open={true} />*/}

         <DatePickersHandler {...props} />
         <div className="mt-4 flex">
            <AlertDialogButton
               className={cn({ 'hidden': !areBikes }, 'grow')}
               variant={'reverse'}
               title={'Aviso'}
               description={
                  'Al modificar la fecha de reserva, las bicicletas seleccionadas para la fecha actual serán eliminadas para que pueda realizar una nueva búsqueda de bicicletas dentro de la nueva fecha seleccionada.'
               }
               actionText={'Modificar fecha'}
               cancelText={'Cancelar'}
               triggerButtonText={'Modificar fecha'}
               handleAction={(event) => dispatchBikesReseted()}
            />
         </div>

         <StepControls nextUrl={nextUrl} nextIsDisabled={!from || !to} />
      </div>
   )
}
