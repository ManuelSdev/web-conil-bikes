//@ts-nocheck
'use client'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebase/client/firebaseClient'
import useFirebaseAuth from '@/lib/firebase/client/useFirebaseAuth'
import useOnAuthStateChange from '@/lib/firebase/client/useOnAuthStateChange'
import { useDeleteCookieQuery } from '@/lib/redux/apiSlices/cookieApi'
import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'

export default function GoogleAuthCheckPageHandler() {
   const { doGetRedirectResult } = useFirebaseAuth()
   useEffect(() => {
      doGetRedirectResult()
   }, [])
   const { authUser, loading: loadingAuthState } = useOnAuthStateChange()
   console.log('GoogleAuthCheckPageHandler authUser->', authUser)
   const handleSignOut = async () => {
      try {
         await signOut(auth)
         console.log('User signed out successfully')
      } catch (error) {
         console.error('Error signing out:', error)
      }
   }
   return (
      <div>
         <h1>GoogleAuthCheckPageHandler</h1>
         {loadingAuthState && <p>Loading...</p>}
         {authUser && (
            <div>
               <p>Logged in as: {authUser.email}</p>
            </div>
         )}
         {!loadingAuthState && !authUser && (
            <div>
               <p>You are not logged in.</p>
            </div>
         )}
         <div>loading GoogleAuthCheckPageHandler.......</div>
         <div>
            <Button onClick={handleSignOut}>Sign Out</Button>
         </div>
      </div>
   )
}
