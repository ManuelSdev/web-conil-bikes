// En tu punto de entrada o configuración:
import { firebaseAuthAdapter } from '@/adapters/auth/firebaseAuthAdapter'
import { postgresUserRepository } from '@/adapters/repositories/userRepository'
import { nodemailerEmailService } from '@/adapters/email/nodemailerService'
import { createUserAccountService } from './application/services/user/createUserAccountService'

const userRepository = { save: postgresUserRepository.save }
const emailService = {
   sendVerificationEmail: nodemailerEmailService.sendVerificationEmail,
}

export const userAccountService = createUserAccountService(
   firebaseAuthAdapter,
   userRepository,
   emailService
)

// Ahora puedes importar 'userAccountService' y usar 'userAccountService.createAccount'
// en tus pages, componentes o API routes.
