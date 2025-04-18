'use client'
import AuthFormCard from '@/components/auth/AuthFormCard'
import { DialogWindow } from '@/components/common/DialogWindow'
import useDialogWindow from '@/components/common/useDialogWindow'
import React, { useEffect } from 'react'
import { ResetPassForm } from './ResetPassForm'
import useFirebaseAuth from '@/lib/firebase/client/useFirebaseAuth'
import Link from 'next/link'
import { useLazySendAuthEmailQuery } from '@/lib/redux/apiSlices/authApi'

export default function ResetPassFormPageHandler() {
   const { dialog, handleSetDialog } = useDialogWindow(null)
   const [sendAuthEmailTrigger] = useLazySendAuthEmailQuery()
   async function onSubmit(data, event) {
      ////console.log('data ->', data)
      ////console.log('ev ->', ev)
      event.preventDefault()
      const { email } = data
      try {
         const res = await sendAuthEmailTrigger({
            email,
            type: 'reset',
         })
      } catch (error) {
         //console.log('error en ResetPassFormPageHandler-> ', error)
      }
   }

   const renderOptionalLinkLeft = (props) => (
      <Link href="/auth/sign-in" {...props}>
         Volver a inicio de sesión
      </Link>
   )
   return (
      <div>
         <DialogWindow {...dialog} />
         <AuthFormCard
            label={'Cambiar contraseña'}
            renderOptionalLinkLeft={renderOptionalLinkLeft}
         >
            <ResetPassForm onSubmit={onSubmit}></ResetPassForm>
         </AuthFormCard>
      </div>
   )
}
