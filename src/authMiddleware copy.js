export async function authMiddleware({
   isAdmin,
   request,
   NextResponse,
   resolvedUrl,
   forceRedirectTo,
}) {
   //console.log('############################################################')
   //TODO: usar verifySessionCookie o esto no vale pa na
   const redirectFn = setRedirect({
      NextResponse,
      resolvedUrl,
      isAdmin,
      forceRedirectTo,
      request,
   })

   const sessionCookie = isAdmin
      ? request.cookies.has('adminSession')
         ? request.cookies.get('adminSession')
         : null
      : request.cookies.has('userSession')
      ? request.cookies.get('userSession')
      : null

   if (!sessionCookie) {
      return redirectFn()
   }
   //console.log('@@ auth reques.url -> ', request.url)

   const res = await fetch(
      process.env.URL +
         `/api/auth/firebaseAdmin/verifySessionCookie?role=${
            isAdmin ? 'admin' : 'user'
         }`,
      {
         headers: {
            cookie: isAdmin
               ? `adminSession=${sessionCookie.value}`
               : `userSession=${sessionCookie.value}`,
         },
      }
   )
   //TODO: termina cuando el mail no está verificado
   const { verified, error } = await res.json()
   if (!verified) return redirectFn()
}

function setRedirect({
   NextResponse,
   resolvedUrl,
   isAdmin,
   forceRedirectTo,
   request,
}) {
   return () => {
      if (forceRedirectTo) {
         const urlToRedirect = new URL(forceRedirectTo, request.url)
         return NextResponse.redirect(urlToRedirect, { status: 302 })
      }
      const urlToRedirect = isAdmin
         ? new URL('/auth', request.url)
         : new URL('/auth/sign-in', request.url)

      /**
       * resolvedUrl es la url de la página en la que usamos getServerSideProps
       * Si no hay cookie de sesión, redireccionamos a '/auth/sign-in'. Allí, al hacer login,
       * lanzamos la petición a '/api/auth', donde el endpoint verifica el idToken.
       * Si el idToken verificado es correcto, ese mismo endpoint 'createSessionCookie' volverá a redireccionar
       * a la página a la que se intentó acceder sin tener la cookieSesion. Por este motivo,
       * necesitamos que el endpoint 'createSessionCookie' conozca la url protegida para
       * redireccionar hasta ella una vez añadida la cookie de session.
       * Por ello, le pasamos la url protegida a la que queremos volver dentro de una cookie
       * a la que llamamos resolvedUrl, que seteamos en el header
       *
       */
      const expiresIn = 60 * 60 * 24 * 5 * 1000
      const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }
      // Setting cookies on the response using the `ResponseCookies` API
      const response = NextResponse.redirect(urlToRedirect, { status: 302 })
      response.cookies.set('resolvedUrl', resolvedUrl, cookieOptions)

      return response
   }
}
/*
  const a = async () => {
      if (adminSession) {
         try {
            app()
            const decodeClaims =
               await getAuth().verifySessionCookie(adminSession)

            const { admin, email } = decodeClaims

            if (!admin) {
               const error = {
                  code: 'custom',
                  message: 'No admin custom claim',
               }
               throw error
            }
         } catch (error) {
           //console.log(
               'ERROR en withGuard: isDashboardPage && adminSession, but...  ->',
               error
            )
            //return redirectToUnauthorized()
            return redirectToLogin(NextResponse, resolvedUrl, urlToRedirect)
         }
      }
   }
   */
