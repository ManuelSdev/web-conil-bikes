//@ts-nocheck
'use client'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebase/client/firebaseClient'
import {
   getRedirectResult,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithPopup,
   signInWithRedirect,
} from 'firebase/auth'
import { use, useEffect } from 'react'

export default function TestPage() {
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            // User is signed in, handle the user object
            console.log('User is signed in:', user)
         } else {
            // User is signed out, handle the sign-out state
            console.log('User is signed out')
         }
      })
      return () => unsubscribe() // Cleanup subscription on unmount
   }, [])
   // const auth = getAuth()
   const provider = new GoogleAuthProvider()

   const handleClick = () => {
      getRedirectResult(auth)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            console.log('result:', result)
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken

            // The signed-in user info.
            const user = result.user
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log('User:', user)
            console.log('Token:', token)
         })
         .catch((error) => {
            // Handle Errors here.
            /*
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.customData.email
            const credential = GoogleAuthProvider.credentialFromError(error)
            */
            console.log('Error:', error)
         })
   }

   const handleSignIn = async () => {
      try {
         const result = await signInWithRedirect(auth, provider)
         console.log('Sign-in result:', result)
      } catch (error) {
         console.error('Error during sign-in:', error)
      }
   }

   const handlePopup = async () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            // The signed-in user info.
            const user = result.user
            // IdP data available using getAdditionalUserInfo(result)
            // ...
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            // ...
         })
   }

   return (
      <div>
         <h1>Test Page</h1>
         <p>Welcome to the test page!</p>
         <Button
            onClick={() => {
               handleSignIn()
            }}
         >
            Sign in with Google
         </Button>
         <Button
            onClick={() => {
               handlePopup()
            }}
         >
            Sign in with Google Popup
         </Button>
         <Button
            onClick={() => {
               handleClick(auth)
            }}
         >
            TEST
         </Button>
      </div>
   )
}
