// /services/authService.ts
import 'server-only'
import { cookies } from 'next/headers'
import { getAuth } from 'firebase-admin/auth'
interface LogoutResponse {
   success: boolean
   // otros campos que devuelva la API
}

export interface Cookie {
   name: string
   value: string
}

export async function logout_(cookie: Cookie): Promise<LogoutResponse> {
   const domain = process.env.URL
   console.log('logout -> ', domain)
   const cookieStore = await cookies()
   const allCookies = cookieStore.getAll()
   console.log('allCookies -> ', allCookies)
   try {
      const response = await fetch(`${domain}/api/auth/logout`, {
         method: 'POST',
         // Establecemos el header "cookie" con "cookie.name=cookie.value"
         headers: {
            // El header 'cookie' es lo que se enviará con la petición.
            cookie: `${cookie.name}=${cookie.value}`,
         },
         credentials: 'same-origin',
      })
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa -> ', response)
      const responseData = await response.json()
      console.log('response -> ', responseData)
      return responseData
   } catch (error: unknown) {
      console.error('Error en logout:', error)
      throw error
   }
}

interface LoginParams {
   isAdmin: boolean
   accessToken: string
}

export async function login({
   isAdmin,
   accessToken,
}: LoginParams): Promise<void> {
   // 5 días en milisegundos
   const expiresIn = 60 * 60 * 24 * 5 * 1000
   const cookieStore = await cookies()

   try {
      // Crea la session cookie usando Firebase Admin
      const sessionCookie: string = await getAuth().createSessionCookie(
         accessToken,
         { expiresIn }
      )
      const cookieName = isAdmin ? 'adminSession' : 'userSession'
      const cookieOptions = { maxAge: expiresIn, httpOnly: true, secure: true }

      cookieStore.set(cookieName, sessionCookie, cookieOptions)
   } catch (error: unknown) {
      // Si el error es una instancia de Error, se relanza; de lo contrario, se lanza un error genérico.
      if (error instanceof Error) {
         throw error
      }
      throw new Error('Unknown error occurred during login')
   }
}

export async function logout() {
   console.log('logout ----------------------------------> ')
   const domain = process.env.URL || 'http://localhost:3000' // Ajusta la URL según tu entorno
   const name = 'miCookie'
   const value = 'valorCookie'
   const maxAge = 3600 // En segundos (ejemplo: 1 hora)

   // Construimos la URL con los parámetros necesarios
   const url = new URL(`${domain}/api/cookies`) // Cambia "endpoint" por el nombre real de tu ruta
   url.searchParams.append('name', name)
   url.searchParams.append('value', value)
   url.searchParams.append('maxAge', maxAge.toString())

   try {
      const response = await fetch(url.toString(), {
         method: 'GET',
         credentials: 'include', // Para enviar cookies al servidor
      })

      if (response.ok) {
         const data = await response.json()
         console.log('Respuesta del servidor:', data)
      } else {
         console.error(
            'Error en la petición:',
            response.status,
            response.statusText
         )
      }
   } catch (error) {
      console.error('Error al realizar la petición:', error)
   }
}
