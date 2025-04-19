// @ts-nocheck
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SigInFormPageHandler from './SigInFormPageHandler'
import GoogleAuthCheckPage from '../checking/page'
import GoogleAuthCheckPageHandler from '../GoogleAuthCheckPageHandler'

export default async function UserSignInPage({ searchParams }) {
   /**
    * Tienes signInWithRedirect en cookie cuando vienes redireccionado desde
    * desde la página de login del provider de autenticación
    */
   const cookieStore = await cookies()

   const isSignInWithRedirect = cookieStore.has('signInWithRedirect')

   // if (isSignInWithRedirect) return <GoogleAuthCheckPageHandler />
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
