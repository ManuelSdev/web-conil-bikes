/**
 * Este middleware revisa las cookies de sesión y redirecciona a la url
 * proporcionada EN CASO DE QUE EL USUARIO @@@ SI @@@ ESTÉ LOGUEADO
 * Solo aplica a usurios de la web, no a administadores
 */
//@ts-nocheck

import React from 'react'

export default async function authPassMiddleware({
   request,
   NextResponse,
   urlToRedirect,
}) {
   const sessionCookie = request.cookies.has('userSession')
      ? request.cookies.get('userSession')
      : null
   if (sessionCookie) {
      console.log('URL -------------> ', process.env.URL)
      const res = await fetch(
         process.env.URL +
            '/api/auth/firebaseAdmin/verifySessionCookie?role=user',
         {
            headers: {
               cookie: `userSession=${sessionCookie.value}`,
            },
         }
      )
      //TODO: revisa cuando el mail no está verificado
      const { verified, error } = await res.json()
      //console.log('authPassMiddleware verified ->', verified)
      //console.log('authPassMiddleware error ->', error)
      if (verified) {
         const url = new URL(urlToRedirect, request.url)
         return NextResponse.redirect(url, { status: 302 })
      }

      if (error) {
         //Si hay error al verificar cookie, redirecciono a la página de login para
         //sobreescribir la cookie
         const res = await fetch(
            process.env.URL + '/api/cookies?name=userSession&value=a&maxAge=0'
         )
         const { succes } = await res.json()
         if (succes) {
            console.log(
               'ERROR en verificación de cookie, la borro y redirecciono a la página de login'
            )
            return NextResponse.redirect(
               new URL('/auth/sign-in', request.url),
               {
                  status: 302,
               }
            )
         }
      }
   }
}
