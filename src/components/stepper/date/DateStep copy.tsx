// @ts-nocheck
'use client'
import DatePickersHandler from './DatePickersHandler'
//import { Link } from 'react-transition-progress/next'

import StepControls from '../StepControls'
// CLAVE import { ArrowRight } from '@phosphor-icons/react'

import { AlertDialogButton } from '@/components/common/AlertDialogButton'
import { cn } from '@/utils/functions'

export default function DateStep({
   areBikes,

   handleSelect,
   nextUrl,
   storedDateRange,
   onDispatch,
}) {
   const { from, to } = storedDateRange
   return (
      <div className={'mx-auto max-w-xs'}>
         {/*<DialogLoader open={true} />*/}

         <DatePickersHandler
            isDisabled={areBikes}
            from={from}
            to={to}
            handleSelect={handleSelect}
            storedDateRange={storedDateRange}
         />
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
               handleAction={(event) => onDispatch()}
            />
         </div>

         <StepControls nextUrl={nextUrl} nextIsDisabled={!from || !to} />
      </div>
   )
}
