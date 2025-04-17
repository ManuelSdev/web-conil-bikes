// @ts-nocheck
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SigInFormPageHandler from './SigInFormPageHandler'

export default async function UserSignInPage({ searchParams }) {
   /**
    * Tienes signInWithRedirect en cookie cuando vienes redireccionado desde
    * desde la página de login del provider de autenticación
    */
   const isSignInWithRedirect = cookies().has('signInWithRedirect')
   if (isSignInWithRedirect) {
      return redirect('/auth/checking')
   }
   /**
    * Tienes verified en query param cuando vienes redireccionado desde
    * desde /auth/control page
    */
   // const { verified: isEmailVerified } = searchParams

   return <SigInFormPageHandler />
}
