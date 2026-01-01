//adapters/auth/userAuthAdapter.ts

import { UserAuthPort } from '@/domain/ports/user/userAuthPort'

export const firebaseAuthAdapter: UserAuthPort = {
   createAuthUser: async (user, password) => {
      // Aquí iría la lógica real para crear el usuario en Firebase.
      // Por ejemplo, llamar a la API de Firebase para registrar al usuario.
      const authId = 'generated-firebase-id' // Simulación de ID generado por Firebase.
      return { authId }
   },
}
