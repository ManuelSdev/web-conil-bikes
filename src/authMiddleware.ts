/**
 * Este middleware revisa las cookies de sesión y redirecciona a la página de login
 * en caso de que el usuario no esté logueado
 */
//@ts-nocheck

export async function authMiddleware({
   isAdmin,
   request,
   NextResponse,
   resolvedUrl,
}) {
   console.log('isAdmin en authMiddleware -> ', isAdmin)
   // console.log('authMiddleware')
   //console.log('request -> ', request)
   const allCookies = request.cookies.getAll()
   //console.log('## allCookies -> ', allCookies)
   //TODO: usar verifySessionCookie o esto no vale pa na
   console.log('request.url en authMiddleware -> ', request.url)
   const urlToRedirect = isAdmin
      ? new URL('/auth', request.url)
      : new URL('/auth/sign-in', request.url)
   console.log('urlToRedirect -> ', urlToRedirect)
   const sessionCookie = isAdmin
      ? request.cookies.has('adminSession')
         ? request.cookies.get('adminSession')
         : null
      : request.cookies.has('userSession')
        ? request.cookies.get('userSession')
        : null

   if (!sessionCookie) {
      console.log('##### SIN sessionCookie')
      return redirectToLogin(NextResponse, resolvedUrl, urlToRedirect)
   }
   //console.log('@@ auth reques.url authMiddleware -> ', request.url)

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
   const authState = await res.json()
   console.log('authState en authMiddleware -> ', authState)
   //  console.log('authState en authMiddleware', authState)
   //TODO: termina cuando el mail no está verificado
   const { verified, error } = authState
   console.log('error en authMiddleware ->', error)
   //TODO: en principio, la verificación de email se tiene en cuenta solo si no es admin
   if (!verified) {
      console.log('##### SIN verified')
      //   console.log('urlToRedirect -> ', urlToRedirect)
      return redirectToLogin(NextResponse, resolvedUrl, urlToRedirect)
   }
   //request.cookies.set('show-banner', 'false')
   //https://nextjs.org/docs/app/building-your-application/routing/middleware#producing-a-response

   //return NextResponse.next()
   console.log('******************* retorna null')
   return null
   const response = NextResponse.next()
   response.cookies.delete('vercel', 'fast')
   return response
}

function redirectToLogin(NextResponse, resolvedUrlCookieValue, urlToRedirect) {
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
   console.log('########## redirectToLogin -> ', resolvedUrlCookieValue)
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }
   // Setting cookies on the response using the `ResponseCookies` API
   const response = NextResponse.redirect(urlToRedirect, { status: 302 })
   response.cookies.set('resolvedUrl', resolvedUrlCookieValue, cookieOptions)
   //console.log('## redirectToLogin -> ', resolvedUrlCookieValue)
   return response
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
