// @ts-nocheck
import DialogWindowPageHandler from '@/components/auth/emailActions/DialogWindowPageHandler'
import NewPassFormPageHandler from '@/components/auth/emailActions/NewPassFormPageHandler'
import RecoverEmailPageHandler from '@/components/auth/emailActions/RecoverEmailPageHandler'
import createCustomTokenWithEmail from '@/lib/firebase/admin/auth/createCustomTokenWithEmail'
import { app, auth } from '@/lib/firebase/client/firebaseClient'

import {
   applyActionCode,
   getAuth,
   verifyPasswordResetCode,
} from 'firebase/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function FireEmailActionsControlPage({ searchParams }) {
   const { mode, oobCode: actionCode, apiKey, continueUrl, lang } = searchParams

   //console.log('searchParams -> ', searchParams)

   //importo el auth de firebaseClient en lugar de crearlo aquí
   //const auth = getAuth(app)

   if (mode === 'verifyEmail') {
      try {
         await applyActionCode(auth, actionCode)

         const onOpenChangeLink = '/auth/sign-in'

         const dialog = {
            open: true,
            title: 'Verificación completada',
            description:
               'Ya puedes iniciar sesión con tu cuenta de correo electrónico',
            closeText: 'Aceptar',
         }

         return (
            <DialogWindowPageHandler
               initialDialog={dialog}
               onOpenChangeLink={onOpenChangeLink}
            />
         )
         //return <VerifyEmailHandler searchParams={searchParams} />
      } catch (error) {
         //console.log('Error en verificiación de código -> ', error)

         const onOpenChangeLink = '/auth/verify'

         const dialog = {
            open: true,
            title: 'Error de verificación',
            description:
               'Es posible que el correo de verificación que te enviamos haya caducado. Por favor, introduce tu correo electrónico para volver a recibir un correo de verificación',
            closeText: 'Aceptar',
         }

         return (
            <DialogWindowPageHandler
               initialDialog={dialog}
               onOpenChangeLink={onOpenChangeLink}
            />
         )
         //  redirect('/auth/verify-email?error_code=true')
      }
      // redirect('/auth/sign-in?verified=true')
   }
   if (mode === 'resetPassword') {
      try {
         //Verifico que el código de reseteo de contraseña sea válido y obtengo el email
         const email = await verifyPasswordResetCode(auth, actionCode)
         //console.log('email FireEmailActionsControlPage-> ', email)
         /**
          * Si es válido, creo un custom token para poder logar directamente al usuario desde
          * el cliente sin necesidad y lo paso al formulario para introducir la nueva contraseña
          * Si la contraseña se cambia correctamente en NewPassFormPageHandler, entonces
          * también uso el custom token para logar al usuario desde NewPassFormPageHandler
          */
         const customToken = await createCustomTokenWithEmail(email)

         return (
            <NewPassFormPageHandler
               searchParams={searchParams}
               customToken={customToken}
               //auth={auth}
            />
         )
      } catch (error) {
         console.log(
            'Error en reseteo de contraseña FireEmailActionsControlPage-> ',
            error
         )

         const dialog = {
            open: true,
            title: 'Ha ocurrido un error',
            description:
               'No se ha podido cambiar la contraseña. Es posible que el enlace haya caducado. Por favor, solicita un nuevo correo de cambio de contraseña',
            closeText: 'Aceptar',
         }

         const onOpenChangeLink = '/'

         return (
            <DialogWindowPageHandler
               initialDialog={dialog}
               onOpenChangeLink={onOpenChangeLink}
            />
         )
      }
   }
   if (mode === 'recoverEmail')
      return <RecoverEmailPageHandler searchParams={searchParams} />
}
