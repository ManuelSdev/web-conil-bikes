'use client'

import React, { use, useEffect, useState } from 'react'
import useFirebaseAuth from '@/lib/firebase/client/useFirebaseAuth'
import AuthFormCard from '../AuthFormCard'
import { Button } from '../../ui/button'
import Link from 'next/link'
import { useCreateAccountMutation } from '@/lib/redux/apiSlices/userApi'
import { VerifyEmailForm } from './VerifyEmailForm'
import useDialogWindow from '@/components/common/useDialogWindow'
import { DialogWindow } from '@/components/common/DialogWindow'
import {
   useFirebaseAdminActionsMutation,
   useLazyGetUserDataQuery,
   useLazySendAuthEmailQuery,
} from '@/lib/redux/apiSlices/authApi'
import { useRouter } from 'next/navigation'

export default function VerifyEmailFormPageHandler() {
   const { dialog, handleSetDialog } = useDialogWindow(null)

   const [getUserDataTrigger, { data, isSuccess, isFetching }] =
      useLazyGetUserDataQuery()
   const [fireAdminActionsTrigger] = useFirebaseAdminActionsMutation()

   const [sendVerificationEmailTrigger] = useLazySendAuthEmailQuery()
   //console.log('dialog ->', dialog)

   const { loading } = useFirebaseAuth()

   const [isEmailSent, setIsEmailSent] = useState(false)

   /**
    * Confirmación de correo electrónico
    * https://stackoverflow.com/questions/73695535/how-to-check-confirm-password-with-zod
    */
   const router = useRouter()
   async function onSubmit(data, event) {
      ////console.log('data ->', data)
      ////console.log('ev ->', ev)
      event.preventDefault()
      const { email } = data
      try {
         /**
          * Si no hay error, devuelve objeto rtk query con la propiedad data, que contiene
          * lo que mandas en la Response del endpoint
          * Cuando hay error, el objeto rtk query devuelto no contiene la propiedad data.
          * Contiene la propiedad error=
          * {status: 'el que hayas puesto en la Response del error,
          * data: {
          * code:'el código de error de firebase', por ejemplo "auth/user-not-found",
          * message: 'error message de firebase'}}
          * Tanto data como error las puedes extraer del objeto error del catch(error) en el route handler
          * https://firebase.google.com/docs/auth/admin/errors
          */
         const res = await getUserDataTrigger({ email })
         console.log('res ******************->', res)
         const { isError } = res

         if (isError) {
            const {
               error: {
                  data: { code, message },
               },
            } = res
            if (code === 'auth/user-not-found') {
               handleSetDialog({
                  open: true,
                  title: 'Ha ocurrido un error',
                  description: `El correo electrónico '${email}' no está registrado`,
                  closeText: 'Aceptar',
               })
            }
         }

         if (!isError) {
            const {
               data: { displayName: name, emailVerified, uid },
            } = res

            if (emailVerified) {
               handleSetDialog({
                  open: true,
                  title: 'Esta cuenta ya fue verificada',
                  description: 'Puedes iniciar sesión con esta cuenta',
                  closeText: 'Aceptar',
                  onOpenChange: (bool) => router.push('/auth/sign-in'),
               })
            }

            if (!emailVerified) {
               //TODO este error no tiene sentido
               const res = await sendVerificationEmailTrigger({
                  name,
                  email,
                  type: 'verify',
               })

               //console.log('sendVerificationEmailTrigger res ->', res)

               const { data, isError } = res

               if (isError) {
                  const { code, message } = data
                  //todo: revisar si hay más errores/porque solouno
                  if (code === 'auth/user-not-found') {
                     handleSetDialog({
                        open: true,
                        title: 'Ha ocurrido un error',
                        description: `Indeterminado`,
                        closeText: 'Aceptar',
                     })
                  }
               } else {
                  handleSetDialog({
                     open: true,
                     title: 'Se ha enviado un correo electrónico de verificación',
                     description: `Se ha enviado un correo electrónico de verificación a '${email}'. Revisa tu bandeja de entrada y recuerda que es posible que lo encuentres en la carpeta de spam o correo no deseado`,
                     closeText: 'Aceptar',
                     onOpenChange: (bool) => router.push('/auth/sign-in'),
                  })
               }
            }
         }

         // const res = await doSendVerificationEmail(email)

         /**
          * Con el customToken puedo obtener el usuario desde el cliente
          */
         //await doSendVerificationEmail(customToken)
         // setIsEmailSent(true)
         // //console.log('ok ->', ok)
         ////console.log('userRecord ->', userRecord)
      } catch (error) {
         //handleOpen(error)
         console.log(
            'ERROR:doSendVerificationEmail en VerifyEmailFormPageHandler -> ',
            error
         )
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

   return loading ? (
      <div>LOADING...</div>
   ) : (
      <div>
         <DialogWindow {...dialog} />
         <AuthFormCard
            label={'Solicitar correo de verificación'}
            renderOptionalLinkLeft={renderOptionalLinkLeft}
         >
            <VerifyEmailForm onSubmit={onSubmit}></VerifyEmailForm>
         </AuthFormCard>
      </div>
   )
}
