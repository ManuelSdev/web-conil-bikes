// @ts-nocheck
export async function POST(req) {
   //console.log('req.body -------->', req.method)
   const body = await req.json()
   const { action } = body
   const a = await actions[action](body)
   return Response.json('data')
}

const actions = {
   createSessionCookie: async (req, res) => {
      /**
       * Si se llegó a loginPage mediante redirección en una ruta protegida por withGuard,
       * encontraemos una cookie con esa url para poder redireccionar allí
       * una vez creada la cookie de sesión
       */

      const getResolvedUrl = (admin) => {
         if (admin) return '/dashboard/bookings/calendar'
         else if (req.cookies.resolvedUrl) {
            const { resolvedUrl } = req.cookies
            //borra la cookie
            // res.setHeader('Set-Cookie', `resolvedUrl=0; Max-Age=0`)
            return resolvedUrl
         } else return '/'
      }

      const authHeader = req.headers.authorization
      //https://stackoverflow.com/questions/50284841/how-to-extract-token-string-from-bearer-token
      const getToken = (authHeader) => {
         if (authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7, authHeader.length)
         } else {
            //console.log('ERROR ON GET-TOKEN')
         }
      }
      // 1- Pilla token
      const accessToken = getToken(authHeader)

      // 2- Comprueba custom claims para saber si es un token de admin o de user
      const decodeToken = await getAuth().verifyIdToken(accessToken)
      const { admin } = decodeToken
      const resolvedUrl = getResolvedUrl(admin)
      // 3- Crea una sessionCookie y la pasas al header como userSession (user) o adminSessión en función de si admin=true o false
      //const cookieText=admin?
      ////console.log('va tokennnnn = ', token)
      const expiresIn = 60 * 60 * 24 * 5 * 1000
      app()
      try {
         // Create the session cookie. This will also verify the ID token in the process.
         // The session cookie will have the same claims as the ID token.
         // To only allow session cookie setting on recent sign-in, auth_time in ID token
         // can be checked to ensure user was recently signed in before creating a session cookie.
         const sessionCookie = await getAuth().createSessionCookie(
            accessToken,
            {
               expiresIn,
            }
         )
         const cookieConfig = admin
            ? `adminSession=${sessionCookie}; Max-Age=${expiresIn}; Path=/; SameSite=Strict; HttpOnly; Secure`
            : `userSession=${sessionCookie}; Max-Age=${expiresIn}; Path=/; SameSite=Strict; HttpOnly; Secure`
         // Set cookie policy for session cookie
         const options = { maxAge: expiresIn, httpOnly: true, secure: true }
         // res.cookie('session', sessionCookie, options)

         //CLAVE: Esta res añade la cookie de sesión y borra la cookie de redirección
         res.setHeader('Set-Cookie', [
            // `session=${sessionCookie}; Max-Age=${expiresIn}; Path=/; SameSite=Strict; HttpOnly; Secure`,
            cookieConfig,
            `resolvedUrl=deleted; Max-Age=0; Path=/; SameSite=Strict; HttpOnly; Secure`,
         ])
         console.log(
            '**************** BORRADA COOKIE DE REDIRECCIÓN en api/auth/route'
         )
         // res.setHeader('Set-Cookie', `resolvedUrl=/; Max-Age=0`)
         res.status(200).end(JSON.stringify({ success: true, resolvedUrl }))
      } catch (err) {
         //console.log('ERROR createSessionCookie usando actions ', err)
         res.status(401).send('UNAUTHORIZED REQUEST!')
      }
   },
}
