// src/adapters/auth/firebaseAuthAdapter.ts
import {
   AuthPort,
   AuthUser,
   SessionCookieParams,
} from '@/core/domain/ports/authPort'
import { User } from '@/core/domain/models/user'
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'

app()

export const createAuthUserAdapter = async (
   userData: Partial<User> & { password: string }
): Promise<boolean> => {
   try {
      await getAuth().createUser({
         email: userData.email,
         password: userData.password,
         displayName: userData.username,
         // Otros campos que quieras mapear desde tu User al User de Firebase
      })
      return true
   } catch (error) {
      console.error('Firebase Admin - Error creating user:', error)
      return false
   }
}

export const getAuthUserAdapter = async (
   authData: Partial<AuthUser>
): Promise<AuthUser | null> => {
   try {
      let userRecord: admin.auth.UserRecord | undefined // Mantenemos el tipado si lo deseas
      if (authData.authId) {
         userRecord = await getAuth().getUser(authData.authId)
      } else if (authData.email) {
         const user = await getAuth().getUserByEmail(authData.email)
         userRecord = user
      }

      if (userRecord) {
         return {
            id: userRecord.uid,
            authId: userRecord.uid,
            username: userRecord.displayName || '',
            email: userRecord.email || '',
            userId: userRecord.uid, // Assuming userId maps to uid
            name: userRecord.displayName || '', // Assuming name maps to displayName
            phone: userRecord.phoneNumber || '', // Assuming phone maps to phoneNumber
            role: 'user', // Assign a default role or map it from userRecord if available
         }
      }
      return null
   } catch (error) {
      console.error('Firebase Admin - Error getting user:', error)
      return null
   }
}

export const deleteAuthUserAdapter = async (
   authData: Partial<AuthUser>
): Promise<boolean> => {
   try {
      let uid: string | undefined
      if (authData.authId) {
         uid = authData.authId
      } else if (authData.email) {
         const user = await getAuth().getUserByEmail(authData.email)
         uid = user.uid
      }

      if (uid) {
         await getAuth().deleteUser(uid)
         return true
      }
      return false
   } catch (error) {
      console.error('Firebase Admin - Error deleting user:', error)
      return false
   }
}

export const createSessionCookieAdapter = async (
   params: SessionCookieParams
): Promise<string> => {
   try {
      const cookie = await getAuth().createSessionCookie(params.token, {
         expiresIn: params.expiresIn * 1000,
      }) // Firebase espera expiresIn en milisegundos
      return cookie
   } catch (error) {
      console.error('Firebase Admin - Error creating session cookie:', error)
      throw error // Re-lanza el error para que la capa de aplicación lo maneje
   }
}

export const revokeUserAuthCredentialsAdapter = async (
   userId: string
): Promise<boolean> => {
   try {
      await getAuth().revokeRefreshTokens(userId)
      return true
   } catch (error) {
      console.error('Firebase Admin - Error revoking refresh tokens:', error)
      return false
   }
}

export const verifySessionCookieAdapter = async (
   cookie: string
): Promise<AuthUser | null> => {
   try {
      const decodedClaims = await getAuth().verifySessionCookie(cookie, true)
      if (decodedClaims?.uid) {
         const userRecord = await getAuth().getUser(decodedClaims.uid)
         return {
            id: userRecord.uid,
            authId: userRecord.uid,
            username: userRecord.displayName || '',
            email: userRecord.email || '',
            // Mapea otros campos
         }
      }
      return null
   } catch (error) {
      // La cookie es inválida o ha expirado
      return null
   }
}

export const updateUserAuthProfileAdapter = async (
   updates: Partial<AuthUser> & { authId: string }
): Promise<boolean> => {
   try {
      const updatePayload: Record<string, any> = {}
      if (updates.email) {
         updatePayload.email = updates.email
      }
      if (updates.username) {
         updatePayload.displayName = updates.username
      }
      // Mapea otras propiedades que quieras actualizar

      await getAuth().updateUser(updates.authId, updatePayload)
      return true
   } catch (error) {
      console.error('Firebase Admin - Error updating user profile:', error)
      return false
   }
}

export const getVerificationLinkAdapter = async (
   user: Partial<AuthUser>
): Promise<string> => {
   if (!user.email) {
      throw new Error('Email is required to generate verification link.')
   }
   try {
      const link = await getAuth().generateEmailVerificationLink(user.email)
      return link
   } catch (error) {
      console.error(
         'Firebase Admin - Error generating verification link:',
         error
      )
      throw error
   }
}

export const firebaseAuthAdapter: AuthPort = {
   createAuthUser: createAuthUserAdapter,
   getAuthUser: getAuthUserAdapter,
   deleteAuthUser: deleteAuthUserAdapter,
   createSessionCookie: createSessionCookieAdapter,
   revokeUserAuthCredentials: revokeUserAuthCredentialsAdapter,
   verifySessionCookie: verifySessionCookieAdapter,
   updateUserAuthProfile: updateUserAuthProfileAdapter,
   getVerificationLink: getVerificationLinkAdapter,
}
