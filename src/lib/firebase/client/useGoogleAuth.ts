// @ts-nocheck
//https://firebase.google.com/docs/auth/web/google-signin?hl=es-419#web-version-9_2
//https://cloud.google.com/identity-platform/docs/web/google?hl=es-419
import {
   getAuth,
   GoogleAuthProvider,
   useDeviceLanguage,
   signInWithRedirect,
   getRedirectResult,
   onAuthStateChanged,
   signOut,
} from 'firebase/auth'

const provider = new GoogleAuthProvider()

//useDeviceLanguage()

import React from 'react'
import { app, auth } from './firebaseClient'
import useOnAuthStateChange from './useOnAuthStateChange'

const UseGoogleAuth = () => {
   //importo el auth de firebaseClient en lugar de crearlo aquí
   //const auth = getAuth(app)

   const { authUser, loading } = useOnAuthStateChange()
   const optAddOAuthScope = (strScope) => {
      //opciónal 2
      provider.addScope(strScope)
   }
   /*
   const optAddOAuthLanguajeCode = (strLangCode) => {
      //opcional 3
      //Si no pasas un código de lenguaje contreto, usa el default del browser
      if (strLangCode) auth.languageCode = strLangCode
      else useDeviceLanguage()
   }
*/
   const optAddOAuthCustomParams = (paramsObject) => {
      //opcional 4
      provider.setCustomParameters({ ...paramsObject })
   }

   const optAddOAuthCustomParamsTest = () => {
      //opcional 4
      provider.setCustomParameters({ prompt: 'select_account' })
   }
   //Redirección a la página de login propia de google
   const doSignInWithRedirect = async (ev) => {
      //CLAVE evitar bucles con onAuthStateChanged
      //https://firebase.google.com/docs/auth/web/manage-users?hl=es-419
      //uso opción 3
      //https://firebase.google.com/docs/auth/web/redirect-best-practices?hl=es-419#proxy-requests
      //Solución proxy inverso en next: rewrite en next.config.js
      //https://stackoverflow.com/questions/75349917/confirmation-of-why-cross-origin-problems-occur-when-using-signinwithredirect-ar
      //https://community.fly.io/t/reverse-proxy-to-firebase-authentication-for-simple-nextjs-app/12013/2
      // const result = await getRedirectResult(auth)
      // if (!authUser && !result)
      ////console.log('first', ev)
      // const results = await signInWithRedirect(auth, provider)
      ////console.log(' ya hay user userrdsfsddr', result)
      try {
         if (!authUser) {
            await signInWithRedirect(auth, provider)
            const result = await getRedirectResult(auth)
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            //console.log('token google ->', token)
         }

         const operationType = result.operationType
         //console.log('###########', operationType)
      } catch (error) {
         //console.log('########### hay error', error)
         // Handle Errors here.
         const errorCode = error.code
         const errorMessage = error.message
         // The email of the user's account used.
         const email = error.customData.email
         // The AuthCredential type that was used.
         const credential = GoogleAuthProvider.credentialFromError(error)
         //console.log('1', errorCode)
         //console.log('2', errorMessage)
         //console.log('3', email)
         //console.log('4', credential)
      }
   }
   //Cuando terminas en la página de login propia de google y vuelves a tu página,
   // recuperas el token OAuth de g
   const doGetRedirectResult = async () => {
      try {
         const result = await getRedirectResult(auth)
         // This gives you a Google Access Token. You can use it to access Google APIs.
         const credential = GoogleAuthProvider.credentialFromResult(result)
         const token = credential.accessToken
      } catch (error) {
         // Handle Errors here.
         const errorCode = error.code
         const errorMessage = error.message
         // The email of the user's account used.
         const email = error.customData.email
         // The AuthCredential type that was used.
         const credential = GoogleAuthProvider.credentialFromError(error)
      }
   }

   const signOutGoogle = () => {
      signOut(auth)
         .then(() => {
            //console.log('@@@@@@@@@ deslogado de google')
         })
         .catch((error) => {
            //console.log('@@@@@@@@@ error al deslogar de google', error)
         })
   }

   return {
      signOutGoogle,
      doSignInWithRedirect,
   }
}

export default UseGoogleAuth
