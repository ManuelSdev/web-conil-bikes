'use client'
import AuthFormCard from '@/components/auth/AuthFormCard'
import { DialogWindow } from '@/components/common/DialogWindow'
import useDialogWindow from '@/components/common/useDialogWindow'
import React from 'react'
import useFirebaseAuth from '@/lib/firebase/client/useFirebaseAuth'
import { NewPassForm } from './NewPassForm'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function NewPassFormPageHandler({
   searchParams,
   customToken,
   // auth,
}) {
   const { oobCode: actionCode } = searchParams

   const { dialog, handleSetDialog } = useDialogWindow(null)
   const { doConfirmPasswordReset } = useFirebaseAuth()
   const router = useRouter()
   const handleConfirmPasswordReset = async (newPassword) => {
      const { success } = await doConfirmPasswordReset({
         actionCode,
         newPassword,
         customToken,
      })
      if (success) {
         handleSetDialog({
            open: true,
            title: 'Contraseña cambiada',
            description:
               'Tu contraseña se ha cambiado correctamente. Ahora puedes iniciar sesión con tu nueva contraseña',
            closeText: 'Aceptar',
            onOpenChange: (bool) => router.push('/'),
         })
      } else {
         handleSetDialog({
            open: true,
            title: 'Ha ocurrido un error',
            description:
               'No se ha podido cambiar la contraseña. Es posible que el enlace haya caducado. Por favor, solicita un nuevo correo de cambio de contraseña',
            closeText: 'Aceptar',
            onOpenChange: (bool) => router.push('/auth/reset'),
         })
      }
   }
   async function onSubmit(data, event) {
      ////console.log('data ->', data)
      ////console.log('ev ->', ev)
      event.preventDefault()
      const { password } = data
      handleConfirmPasswordReset(password)
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
            <NewPassForm onSubmit={onSubmit} />
         </AuthFormCard>
      </div>
   )
}
