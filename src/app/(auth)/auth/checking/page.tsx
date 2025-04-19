// @ts-nocheck
import React from 'react'
import GoogleAuthCheckPageHandler from '../GoogleAuthCheckPageHandler'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export default async function GoogleAuthCheckPage() {
   const cookieStore = await cookies()
   const isSignInWithRedirect = cookieStore.has('signInWithRedirect')

   if (!isSignInWithRedirect) return redirect('/auth/sign-in')
   return <GoogleAuthCheckPageHandler />
}
