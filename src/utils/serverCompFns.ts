// @ts-nocheck
import 'server-only'

import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import { i18n } from '../../i18n-config'

/**
 * Esta función extrae la locale usando los headers disponibles en una page.jsx
 * Úsala en pages pásandole el parámetro header
 * import { headers } from 'next/headers'
 * const locale = getHeadersLocale(headers)
 */
export function getHeadersLocale(headers) {
   const headersList = headers()
   //console.log('headersList en server ->', headersList.get('Accept-Language'))

   // Negotiator expects plain object so we need to transform headers
   const negotiatorHeaders = {}
   headersList.forEach((value, key) => (negotiatorHeaders[key] = value))
   const locales = i18n.locales
   // Use negotiator and intl-localematcher to get best locale
   let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
      locales
   )
   const locale = matchLocale(languages, locales, i18n.defaultLocale)

   //console.log('=============', locale)
   return locale
}

/**
 * Esta función extrae la locale usando los headers disponibles
 * en el parámetro request que recibe la función middleware de nextjs
 * Úsala dentro de una función middleware
 *  function middleware(request){..
 *      const locale = getHeadersLocale(request)
 * ..}
 *
 */
export function getRequestLocale(request) {
   // Negotiator expects plain object so we need to transform headers
   const negotiatorHeaders = {}
   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

   // @ts-ignore locales are readonly
   const locales = i18n.locales

   // Use negotiator and intl-localematcher to get best locale
   let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
      locales
   )

   const locale = matchLocale(languages, locales, i18n.defaultLocale)

   return locale
}

/**
 * Origen: https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing
 * configuración del middleware.ts
 */
