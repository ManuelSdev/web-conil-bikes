export default async function adminAuthMiddleware(
   request,
   NextResponse,
   resolvedUrl
) {
   const urlToRedirect = new URL('/dashboard/login', request.url)
   const adminSession = request.cookies.has('adminSession')
      ? request.cookies.get('adminSession')
      : null

   if (!adminSession) {
      return redirectToLogin(NextResponse, resolvedUrl, urlToRedirect)
   }

   if (adminSession) {
      const res = await fetch('/api/auth/firebaseAdmin?role=admin')
      const { verified, error } = await res.json()
      if (!verified)
         return redirectToLogin(NextResponse, resolvedUrl, urlToRedirect)
   }

   function redirectToLogin(
      NextResponse,
      resolvedUrlCookieValue,
      urlToRedirect
   ) {
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
      response.cookies.set('resolvedUrl', resolvedUrlCookieValue, cookieOptions)

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
            console.log(
               'ERROR en withGuard: isDashboardPage && adminSession, but...  ->',
               error
            )
            //return redirectToUnauthorized()
            return redirectToLogin(NextResponse, resolvedUrl, urlToRedirect)
         }
      }
   }
   */