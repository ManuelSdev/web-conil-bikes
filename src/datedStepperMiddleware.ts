//@ts-nocheck
export default function datedStepperMiddleware({
   request,
   NextResponse,
   urlToRedirect,
}) {
   console.log(
      '========================== datedStepperMiddleware =========================='
   )
   //  console.log('## request.url -> ', request)
   const stepperDated = request.cookies.has('stepperDated')
   return NextResponse.next()
   //La borras en la respuesta, no en la petición
   //request.cookies.delete('stepperDated')
   //console.log('## nextUrl -> ', request.nextUrl)
   if (stepperDated) {
      console.log('Cookie borrada ************************************')
      const response = NextResponse.next()
      //  response.cookies.delete('stepperDated')
      //response.cookies.set('vercel', 'fast')
      return response
   } else {
      //   return NextResponse.next()
      const url = new URL(urlToRedirect, request.url)
      console.log('Redirección ###########################################')
      // return null

      //https://nextjs.org/docs/app/api-reference/functions/redirect#why-does-redirect-use-307-and-308
      const response = NextResponse.redirect(url, { status: 308 })
      return response
   }
}

function redirectToLogin(NextResponse, resolvedUrlCookieValue, urlToRedirect) {
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }
   // Setting cookies on the response using the `ResponseCookies` API
   const response = NextResponse.redirect(urlToRedirect, { status: 302 })
   response.cookies.set('resolvedUrl', resolvedUrlCookieValue, cookieOptions)
   //console.log('## redirectToLogin -> ', resolvedUrlCookieValue)
   return response
}

function deleteQueryParams(request) {
   const nextUrl = request.nextUrl
   const isDated = nextUrl.searchParams.get('dated')
   console.log('isDated -> ', isDated)
   if (isDated) {
      nextUrl.searchParams.delete('dated')
      return NextResponse.rewrite(nextUrl)
   }
}

function deleteQueryParamsAlt(request) {
   const url = new URL(request.url)
   url.searchParams.delete('dated')
   return url
}

const probando = () => {
   const nextUrl = request.nextUrl.clone()
   console.log('## nextUrl -> ', nextUrl)
   const isDated = nextUrl.searchParams.get('dated')
   console.log('## isDated -> ', isDated)
   if (isDated) {
      nextUrl.searchParams.delete('dated')
      //console.log('## nextUrl -> ', nextUrl)
      return NextResponse.redirect(nextUrl, { status: 302 })
      //return NextResponse.rewrite(nextUrl)
   }
   const userId = nextUrl.searchParams.get('userId')
   console.log('## userId -> ', userId)
   //https://nextjs.org/docs/app/api-reference/functions/redirect#why-does-redirect-use-307-and-308
   // return NextResponse.redirect(urlToRedirect, { status: 308 })
}
