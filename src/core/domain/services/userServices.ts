//@ts-nocheck
//ruta: src/domain/services/userServices.ts
// /src/domain/services/userServices.ts

import { User } from '@/core/domain/models/user'
import { AuthPort, AuthUser } from '@/core/domain/ports/authPort'
import { UserRepositoryPort } from '@/core/domain/ports/userRepositoryPort'

// Dependencias necesarias para la orquestación: únicamente las que afectan el "qué hacer"
export type CreateAccountDependencies = {
   userRepository: UserRepositoryPort
   auth: AuthPort
}

export const createAccount = async (
   userData: Partial<User> & { password: string },
   deps: CreateAccountDependencies
): Promise<User> => {
   const { userRepository, auth, notifier } = deps

   // 1. Crear el usuario en la base de datos con estado inactivo.
   const newUser: User = await userRepository.createUser({
      ...userData,
      active: false, // No puede operar hasta la verificación.
   })

   // 2. Registrar al usuario en el proveedor de autenticación.
   const authCreated: boolean = await auth.createAuthUser({ ...userData })
   if (!authCreated)
      throw new Error('Error al registrar al usuario en autenticación')

   // 3. Obtener el enlace de verificación del email.
   const verificationLink: string = await auth.getVerificationLink({
      email: userData.email,
      userId: newUser.userId,
   })

   // 4. Ordenar el envío del email de verificación (sin definir cómo se envía).
   await notifier.sendVerificationEmail(userData.email, verificationLink)

   return newUser
}
