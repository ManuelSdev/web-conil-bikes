// @ts-nocheck
import {
   getAuth,
   signInWithEmailAndPassword,
   signInWithRedirect,
   signOut,
   GoogleAuthProvider,
   getRedirectResult,
   getAdditionalUserInfo,
   signInWithCredential,
   sendVerificationEmail,
   signInWithCustomToken,
   confirmPasswordReset,
} from 'firebase/auth'
import { app, auth } from './firebaseClient'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateSessionCookieMutation } from '@/lib/redux/apiSlices/authApi'
import {
   useLazyDeleteCookieQuery,
   useLazyCreateCookieQuery,
} from '@/lib/redux/apiSlices/cookieApi'

import useOnAuthStateChange from './useOnAuthStateChange'
//import { th } from 'date-fns/locale'
import { useLazyGetUserQuery } from '@/lib/redux/apiSlices/userApi'

const provider = new GoogleAuthProvider()

export default function useFirebaseAuth() {
   //const { authUser, loading: loadingAuthState } = useOnAuthStateChange(auth)
   //console.log('provider -> ', provider)

   //importo el auth de firebaseClient en lugar de crearlo aquí
   //const auth = getAuth(app)

   const [isLoading, setLoading] = useState(false)

   const router = useRouter()

   const [createCookieTrigger] = useLazyCreateCookieQuery()

   const [deleteCookieTrigger] = useLazyDeleteCookieQuery()
   const [getUserTrigger] = useLazyGetUserQuery()

   const [createSessionCookie, { loading: loadingCreateSession }] =
      useCreateSessionCookieMutation()

   // console.log('isSuccess -> ', isSuccess)
   // console.log('data -> ', data)
   // const datas = '==================================='
   const doCreateSessionCookie = async ({ accessToken, isAdmin = false }) => {
      //   console.log('doCreateSessionCookie SETLOADING A TRUE @@ ')
      //   setLoading(true)
      console.log('doCreateSessionCookie -> ', accessToken)
      //TODO: el unwrap de una mutation puede devolver un objeto res o un error
      //Estás asumiendo que siempre devuelve un objeto res y lo destructuras
      //pero si devuelve un error, no lo estás capturando, aunque fallará la dsctructuración
      try {
         const { success, resolvedUrl } = await createSessionCookie({
            accessToken,
            isAdmin,
         }).unwrap()

         //si crea la cookie session correctamente, borro (deslogo) el estado de auth
         //en el clienteS
         console.log('resolvedUrl -> ', resolvedUrl)
         console.log('ANTES de signOut -> ')
         success && signOut(auth)
         console.log('DESPUES de signOut -> ')
         console.log('doCreateSessionCookie signOut-> ')
         success && router.push(resolvedUrl)
      } catch (error) {
         signOut(auth)
         //setLoading(true)
         console.log('errorrr en doCreateSessionCookie -> ', error)
         throw error
      }

      //Y luego mando a la resolvedUrl que me diga el server
   }
   //Recibe customToken creado con firebase admin
   //Esto loga desde el cliente con un customToken creado en el server
   //Ütil para logar sin password, como en reset password

   const doSignInWithCustomToken = async (customToken) => {
      try {
         const userCredential = await signInWithCustomToken(auth, customToken)

         const { user } = userCredential

         const { accessToken } = user
         //TODO RESPASAR TODAS LAS MUTATIONS PARA VER SI DEVUELVEN UN OBJETO RES O UN ERROR
         const res = await createSessionCookie(accessToken).unwrap()
         return res
      } catch (error) {
         console.log('error en doSignInWithCustomToken -> ', error)
      }
   }

   const customTokenclientLoginWithoutCookie = async (customToken) => {
      try {
         const userCredential = await signInWithCustomToken(auth, customToken)
         const { user } = userCredential
         const { accessToken } = user
         return accessToken
      } catch (error) {
         console.log('error en customTokenclientLoginWithoutCookie -> ', error)
      }
   }

   const doConfirmPasswordReset = async ({
      actionCode,
      newPassword,
      customToken,
   }) => {
      try {
         const res = await confirmPasswordReset(auth, actionCode, newPassword)
         const { success, resolvedUrl } =
            await doSignInWithCustomToken(customToken)
         //Ahora tienes la confirmación y la cookie de sesión, redireccionas desde el cliente
         //No necesitas deslogar en cliente porque no has logado para conseguir un token,
         //ya que has usado un customToken directamente
         if (success) return { success: true }
         else {
            const error =
               'Error en doConfirmPasswordReset en createSessionCookie'
            throw error
         }
      } catch (error) {
         console.log('error en doConfirmPasswordReset -> ', error)
         return { success: false, error }
      }
   }

   const doAdminSignInWithEmailAndPassword = async ({
      isAdmin,
      email,
      password,
   }) => {
      setLoading(true)
      console.log('doAdminSignInWithEmailAndPassword -> ', email, password)
      try {
         const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
         )

         const idTokenResult = await auth.currentUser.getIdTokenResult()

         const {
            claims: { appRole },
         } = idTokenResult
         //Solo crea la cookie si appRole es admin o manager
         if (appRole === 'user') {
            const error = { code: 'custom/unauthorized' }
            throw error
         }
         const { user } = userCredential
         const { accessToken } = user

         await doCreateSessionCookie({ accessToken, isAdmin: true })

         //return { emailVerified }
      } catch (err) {
         //    signOut(auth)
         //todo mira que esto retorne ok por si dejas mensaje en ui
         // console.log('doSignInWithEmailAndPassword ERROR -> ', err)
         const { code } = err
         //  const error = errorHandlerSignMailAndPass(code)
         //  setLoading(false)
         throw err
         // return { error }
      } finally {
         setLoading(false)
      }
   }

   const doSignInWithEmailAndPassword = async ({
      isAdmin,
      email,
      password,
   }) => {
      //  console.log('doSignInWithEmailAndPassword    ', email, password)
      /**
       * Como voy a gestionar la autenticación con cookies de sesión desde el server,
       * no necesito mantener el estado de sesión en el cliente
       * Segun esto: https://firebase.google.com/docs/auth/admin/manage-cookies?hl=es-419#sign_in
       * puedes anular el estado de sesión en el cliente desde el principio, anulando la persistencia
       *    -firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
       * o puedes hacerlo al final, con un signOut directo en el lado del cliente
       *    - return firebase.auth().signOut();
       * En este caso, usaré el signOut dentro de doCreateSessionCookie, ya que voy a usar
       * este último método para gestionar también la session cookie cuando uso
       * el login con google
       * CLAVE: no quito la persistencia inicialmente porque, si bien doSignInWithEmailAndPassword
       * puede recoger directamente el accessToken del user, cuando uso el login con google necesito
       * sacar ese accessToken del usuario, por eso necesito que, por un espacio de tiempo, el estado de auth
       * exista en el cliente para obtener el accessToken con desde onAuthStateChanged
       */
      setLoading(true)

      try {
         const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
         )
         console.log(
            '@@@@@@@@@@@@@@@@@@@@@@@@@@@  userCredential -> ',
            userCredential
         )
         /*
         //Esto era para distinguir los usuarios admin de los users normales
         const idTokenResult = await auth.currentUser.getIdTokenResult()
         const { claims: role } = idTokenResult
         if (isAdmin && role === 'admin')
            throw new Error('custom/permission-denied')
         */
         const { user } = userCredential
         const { accessToken, emailVerified } = user

         //https://firebase.google.com/docs/auth/admin/custom-claims?hl=es&authuser=2#access_custom_claims_on_the_client

         //CLAVE https://stackoverflow.com/questions/70073367/js-multiple-nested-try-catch-blocks

         if (emailVerified) {
            await doCreateSessionCookie({ accessToken })
         } else {
            signOut(auth)
            const error = { code: 'custom/unverified' }
            throw error
         }

         //return { emailVerified }
      } catch (err) {
         //    signOut(auth)
         //todo mira que esto retorne ok por si dejas mensaje en ui
         // console.log('doSignInWithEmailAndPassword ERROR -> ', err)
         const { code } = err
         //  const error = errorHandlerSignMailAndPass(code)
         //  setLoading(false)
         throw err
         // return { error }
      } finally {
         setLoading(false)
      }
   }
   /**
    * @description dooSignInWithRedirect te redirige a la página de login del provider
    *  (google en este caso). Cuando te logas en esa página, te devuelve a la página
    * anterior, en este caso /auth/sign-in. De vuelta en /auth/sign-in, hay que
    * recuperar la información del login en el provider y crear la cookie de sesión.
    * Esta operacion no la haremos en /auth/sign-in porque, los renderizados que implica
    * al usar un estado de loading, hacen que la interfaz se vea mal.
    * Entonces, creamos una cookie que indique que estamos en una operación signInWithRedirect.
    * Cuando el provider nos devuelve a /auth/sign-in, si existe la cookie, la págiona redirige
    * a /auth/checking, donde se recupera la información del login en el provider y se crea la
    * cookie de sesión usando doGetRedirectResult.
    *
    *
    */
   const doSignInWithRedirect = async (ev) => {
      const addCookie = await createCookieTrigger({
         name: 'signInWithRedirect',
         value: true,
      })
      //CLAVE evitar bucles con onAuthStateChanged
      //https://firebase.google.com/docs/auth/web/manage-users?hl=es-419
      //uso opción 3
      //https://firebase.google.com/docs/auth/web/redirect-best-practices?hl=es-419#proxy-requests
      //Solución proxy inverso en next: rewrite en next.config.js
      //https://stackoverflow.com/questions/75349917/confirmation-of-why-cross-origin-problems-occur-when-using-signinwithredirect-ar
      //https://community.fly.io/t/reverse-proxy-to-firebase-authentication-for-simple-nextjs-app/12013/2
      await signInWithRedirect(auth, provider)
   }
   //TODO: admin.auth().updateUser(uid, { emailVerified: true }) cuando haces el login con google
   /**
    * @description getRedirectResult recupera la información del login recien hecho en la página
    * del provider. El objeto credential contiene dos token (idToken y accessToken) que,
    * según la docu, sirven para las APIS de google, pero no están directamente relacionados con
    * firebase, de modo que no pueden ser verificados por firebase admin con getAuth().verifyIdToken(accessToken).
    * Por tanto, no sirvern para crear una cookie de sesion En cambio, si usas el hook useonAuthStateChanged,
    * puedes obtener el accessToken propio de firebase que si es verificable por firebase admin.
    * ENTONCES: el método que verifica/convierte el token (accessToken) de google es signInWithCredential,
    * que a su vez devuelve un userCredential que contiene el accessToken propio de firebase.
    * Una vez obtenido el accessToken propio de firebase, se puede crear la cookie de sesión igual
    * que cuando te logas con email y password.
    *
    */
   //Cuando terminas en la página de login propia de google y vuelves a tu página,
   // recuperas el token OAuth de g
   const doGetRedirectResult = async () => {
      try {
         const deleteCookie = await deleteCookieTrigger('signInWithRedirect')

         const result = await getRedirectResult(auth)
         if (!result) {
            return console.log(
               'CUSTOM RETURN doGetRedirectResult: No hay result'
            )
         }
         //   if (!result) throw new Error('CUSTOM ERROR: No hay result')
         // This gives you a Google Access Token. You can use it to access Google APIs.
         const googleCredential =
            GoogleAuthProvider.credentialFromResult(result)
         const fireCredential = await signInWithCredential(
            auth,
            googleCredential
         )
         console.log('fireCredential -> ', fireCredential)
         const {
            user: { accessToken, emailVerified },
         } = fireCredential
         await doCreateSessionCookie(accessToken)
         /*
         const { idToken, accessToken } = googleCredential
         console.log('idToken directo en getRedirectResult -> ', idToken)
         console.log('accessToken directo en getRedirectResult ->', accessToken)
          await doCreateSessionCookie(idToken)
         const additionalUserInfo = getAdditionalUserInfo(result)
         */

         //console.log('additionalUserInfo -> ', additionalUserInfo)
      } catch (error) {
         // Handle Errors here.
         console.log('error en getRedirectResult -> ', error)
         /*
         const errorCode = error.code
         const errorMessage = error.message
         // The email of the user's account used.
         const email = error.customData.email
         // The AuthCredential type that was used.
         const credential = GoogleAuthProvider.credentialFromError(error)
         */
      }
   }

   const doSignOut = () => signOut(auth)
   return {
      //  authUser,
      //loadingAuthState,
      isLoading,
      doAdminSignInWithEmailAndPassword,
      doSignInWithEmailAndPassword,
      doSignInWithRedirect,
      doGetRedirectResult,
      doCreateSessionCookie,
      doConfirmPasswordReset,
      doSignInWithCustomToken,
      customTokenclientLoginWithoutCookie,
      doSignOut,
   }
}
