// domain/ports/authenticationPort.ts
export type IsEmailVerifiedPort = (userId: string) => Promise<boolean>
export const isEmailVerified: IsEmailVerifiedPort = async (
   userId: string
): Promise<boolean> => {
   // Esta es solo una firma de ejemplo o un placeholder.
   throw new Error('Not implemented')
}

/**USO EN EL DOMINIO */

// domain/services/userAuthService.ts
import { isEmailVerified } from '../../core/domain/ports/authenticationPort'
import { User } from '../models/user'

export const ensureUserEmailVerified = async (
   user: User,
   authService: typeof isEmailVerified
): Promise<void> => {
   const verified = await authService(user.userId)
   if (!verified) {
      throw new Error('El email del usuario no está verificado.')
   }
}

/**IMPLEMENTACION EN ADAPTADOR */

// adapters/auth/firebaseAuthAdapter.ts
import { FirebaseAuthAPI } from 'path-to-firebase-sdk' // Ejemplo
import { IsEmailVerifiedPort } from '../../core/domain/ports/authenticationPort'

export const isEmailVerified: IsEmailVerifiedPort = async (
   userId: string
): Promise<boolean> => {
   // Lógica real con Firebase para obtener el estado de verificación
   const userRecord = await FirebaseAuthAPI.getUser(userId)
   return userRecord.emailVerified
}

/** USO E INYECCION DE DEPENDENCIAS EN APLICATION/SERVICES */ //eSTA ES LA FUNCION QUE SE LLAMA DESDE EL CONTROLADOR O DESDE EL EL CODIGO DE LA APLICACION EN GENERAL
/**
 * Es decir, llamo a la funcion que no es más que la funcion de dominio recibiendo como argumento la implementacion concreta del puerto.
 * La logica de la funcion de dominio espera cosasas y hace otras sin saber como las resuelve la funcion que le pasamos como argumento.
 */

// application/services/userAccountService.ts
import { ensureUserEmailVerified } from '../../core/domain/services/userAuthService'
import { isEmailVerifiedImplementation } from '../../core/adapters/auth/firebaseAuthAdapter'
import { User } from '../../core/domain/models/user'

export const performSensitiveAction = async (user: User): Promise<void> => {
   // Aquí se inyecta la implementación concreta del puerto usando el adaptador de Firebase.
   await ensureUserEmailVerified(user, isEmailVerifiedImplementation)

   // Luego sigue el resto del proceso del caso de uso.
   console.log('Acción sensible permitida para usuario verificado')
}

/**
 * En este ejemplo de arriba:
- La función ensureUserEmailVerified forma parte del dominio y se ocupa únicamente de la lógica de negocio 
  relacionada con la verificación del email.
- La implementación concreta isEmailVerifiedImplementation se obtiene del adaptador adaptado a Firebase y 
  se inyecta en el servicio de aplicación.
- La capa de aplicación es la encargada de juntar estas piezas, garantizando que el dominio se mantenga 
  independiente de cómo se implementen las tareas de verificación.

De esta forma, si en el futuro decides cambiar de Firebase a otro proveedor, solo tendrás que actualizar
 la implementación del adaptador, sin tocar la lógica del dominio ni la de la capa de aplicación que orquesta el uso del puerto.

 */

/**EJEMPLO DE USO DEL SERVICIO DE APLICACION DE ARRIBA  */

// api/endpoint.ts
import { performSensitiveAction } from '../../application/services/userAccountService'
import { getUserFromRequest } from '../utils' // Función que extrae el usuario del request

export default async function handler(req, res) {
   try {
      const user = getUserFromRequest(req)
      // Aquí se llama a la función de la capa de aplicación que orquesta la verificación y otras acciones.
      await performSensitiveAction(user)
      res.status(200).json({ message: 'Acción realizada correctamente' })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}
