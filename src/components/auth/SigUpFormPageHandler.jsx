'use client'

import React from 'react'
import AuthFormCard from './AuthFormCard'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SignUpForm } from './SignUpForm'
import { useCreateAccountMutation } from '@/lib/redux/apiSlices/userApi'
import useDialogWindow from '../common/useDialogWindow'
import {
   useFirebaseAdminActionsMutation,
   useLazyCreateFirebaseUserQuery,
} from '@/lib/redux/apiSlices/authApi'
import { signUpErrorHandler } from '@/lib/firebase/client/authErrorHandler'
import { DialogWindow } from '../common/DialogWindow'
import { useRouter } from 'next/navigation'

export default function SigUpFormPageHandler({ isAdmin }) {
   /*
   const [
      createAccount,
      {
         // status,
         //  isUninitialized,
         isLoading,
         isSuccess,
         data,
         isError,
         reset,
      },
   ] = useCreateAccountMutation({ fixedCacheKey: 'createBooking-key' })
   */
   const [createFireUserTrigger] = useLazyCreateFirebaseUserQuery()
   const [fireAdminActionsTrigger] = useFirebaseAdminActionsMutation()
   const router = useRouter()
   // const [createAppUserTrigger] = useCreateUserMutation()
   const [createUserAccountTrigger, { isLoading }] = useCreateAccountMutation()

   const { dialog, handleSetDialog } = useDialogWindow()

   /**
    * Confirmación de correo electrónico
    * https://stackoverflow.com/questions/73695535/how-to-check-confirm-password-with-zod
    */

   async function onSubmit(data, event) {
      //console.log('data ->', data)
      ////console.log('ev ->', ev)
      event.preventDefault()
      const { name, phone, email, password } = data
      try {
         const createUserAccountRes = await createUserAccountTrigger({
            name,
            phone,
            email,
            password,
         }).unwrap()

         handleSetDialog({
            open: true,
            title: 'La cuenta se ha creado correctamente',
            description: `Se ha enviado un correo electrónico de verificación a '${email}'. Revisa tu bandeja de entrada y recuerda que es posible que lo encuentres en la carpeta de spam o correo no deseado`,
            closeText: 'Aceptar',
            onOpenChange: (bool) => router.push('/auth/sign-in'),
         })
      } catch (error) {
         const {
            data: { code },
         } = error
         const dialogMessage = signUpErrorHandler(code)
         handleSetDialog({
            open: true,
            title: 'Ha ocurrido un error',
            description: dialogMessage,
            closeText: 'Aceptar',
         })
      }
   }

   const renderSubmitButton = (props) => (
      <Button {...props} type="submit">
         Crear cuentas
      </Button>
   )

   const renderOptionalLinkLeft = (props) => (
      <Link href="/auth/sign-in" {...props}>
         ¿Ya tienes una cuenta? Inicia sesión
      </Link>
   )

   return (
      <div>
         <DialogWindow {...dialog} />
         <AuthFormCard
            isLoading={isLoading}
            label={'Crear cuenta'}
            renderOptionalLinkLeft={renderOptionalLinkLeft}
         >
            <SignUpForm onSubmit={onSubmit}></SignUpForm>
         </AuthFormCard>
      </div>
   )
}
