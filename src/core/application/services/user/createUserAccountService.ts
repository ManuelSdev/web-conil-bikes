// /application/services/userAppServices.ts (ejemplo)
import { AuthPort } from '@/domain/ports/authPort'
import { UserRepository } from '@/domain/ports/userRepositoryPort'
import { EmailServicePort } from '@/domain/ports/emailServicePort'
import { User } from '@/core/domain/models/user'

export const createUserAccountService = (
   authPort: AuthPort,
   userRepository: UserRepository,
   emailService: EmailServicePort
) => {
   return {
      createAccount: async (
         userData: Partial<User> & { password: string }
      ): Promise<User | null> => {
         try {
            // 1. Registrar al usuario en el proveedor de autenticación (usando authPort)
            const authSuccess = await authPort.createAuthUser(userData)
            if (!authSuccess) {
               console.error('Error al registrar el usuario en auth.')
               return null
            }

            // 2. Obtener el Auth ID del usuario recién creado (usando authPort)
            const authUser = await authPort.getAuthUser({
               email: userData.email,
            })
            if (!authUser?.authId) {
               console.error('No se pudo obtener el Auth ID del usuario.')
               return null
            }

            // 3. Crear al usuario en tu base de datos (usando userRepository)
            const newUser: User = {
               id: crypto.randomUUID(),
               username: userData.username!,
               email: userData.email!,
               authId: authUser.authId,
               // ... otros campos
            }
            const userCreatedInDb = await userRepository.save(newUser)
            if (!userCreatedInDb) {
               console.error('Error al crear el usuario en la base de datos.')
               await authPort.deleteAuthUser({ authId: authUser.authId })
               return null
            }

            // 4. Obtener el enlace de verificación de email (usando authPort)
            const verificationLink =
               await authPort.getVerificationLink(authUser)

            // 5. Enviar el email de verificación al usuario (usando emailService)
            const emailSent = await emailService.sendVerificationEmail(
               newUser.email,
               verificationLink
            )
            if (!emailSent) {
               console.warn('Error al enviar el email de verificación.')
            }

            return newUser
         } catch (error) {
            console.error('Error al crear la cuenta:', error)
            return null
         }
      },
      // ... otras funciones de orquestación de casos de uso relacionados con usuarios
   }
}
