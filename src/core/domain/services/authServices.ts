// domain/services/userAuthService.ts

import { User } from '../models/user'
import { isEmailVerified } from '../ports/authPort'

export const ensureUserEmailVerified = async (
   user: User,
   authService: typeof isEmailVerified // Aquí se indica que authService debe tener la misma firma que isEmailVerified
): Promise<void> => {
   const verified = await authService(user.userId)
   if (!verified) {
      throw new Error('El email del usuario no está verificado.')
   }
}
