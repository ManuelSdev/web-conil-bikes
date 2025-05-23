//@ts-nocheck

'use client'

import React from 'react'
import { SignInForm } from './SignInForm'
import useFirebaseAuth from '@/lib/firebase/client/useFirebaseAuth'
import AuthFormCard from '../AuthFormCard'

import GoogleIcon from '@/components/svg/GoogleIcon'
import Link from 'next/link'

import { signInErrorHandler } from '@/lib/firebase/client/authErrorHandler'
import { useRouter } from 'next/navigation'
import { DialogWindow } from '@/components/common/DialogWindow'
import useDialogWindow from '@/components/common/useDialogWindow'
import { Button } from '@/components/ui/button'

export default function SigInFormPageHandler({ isAdmin }) {
   //console.log('@@ RENDER SigInFormPageHandler @@')
   //Initial dialog cuando vienes redireccionado de la página de verificación de email

   const {
      doAdminSignInWithEmailAndPassword,
      doSignInWithEmailAndPassword,
      doSignInWithRedirect,
      isLoading,
   } = useFirebaseAuth()

   const { dialog, handleSetDialog } = useDialogWindow(null)

   const router = useRouter()

   async function onSubmit(data, event) {
      event.preventDefault()
      const { email, password } = data

      try {
         doSignInWithEmailAndPassword({ isAdmin, email, password })
      } catch (error) {
         //handleOpen(error)
         //console.log('doSignInWithEmailAndPassword ERROR -> ', error)

         const { code } = error
         //console.log('code ->', code)
         const { title, description } = signInErrorHandler(code)
         //console.log('title ->', title)
         const unverified = code === 'custom/unverified'
         handleSetDialog({
            open: true,
            title,
            description,
            ...(unverified
               ? {
                    actionText: 'aceptar',
                    handleAction: () => router.push('/auth/verify'),
                 }
               : { closeText: 'Aceptar' }),
         })
      }
   }

   const renderSubmitButton = (props) => (
      <Button {...props} type="submit">
         Iniciar sesións
      </Button>
   )
   const renderGoogleButton = (props) => (
      <Button onClick={doSignInWithRedirect} {...props}>
         <GoogleIcon className="mr-2 h-6 w-6" />
         INICIAR SESIÓN CON GOOGLE
      </Button>
   )
   const renderOptionalLinkLeft = (props) => (
      <Link href="/auth/reset" {...props}>
         ¿Olvidaste la contraseña?
      </Link>
   )
   const renderOptionalLinkRight = (props) => (
      <Link href="/auth/sign-up" {...props}>
         Crear cuenta
      </Link>
   )
   //  loadingUseFirebaseAuth || loadingOnAuthStateChange ? (<div>loadingOnAuthStateChange signin page: wait for authUser...</div>) :

   return (
      <div>
         <DialogWindow {...dialog} />
         <AuthFormCard
            isLoading={isLoading}
            label={'Inicio de sesión'}
            renderOptionalLinkLeft={renderOptionalLinkLeft}
            renderOptionalLinkRight={!isAdmin && renderOptionalLinkRight}
            renderGoogleButton={!isAdmin && renderGoogleButton}
         >
            <SignInForm onSubmit={onSubmit}></SignInForm>
         </AuthFormCard>
      </div>
   )
}
