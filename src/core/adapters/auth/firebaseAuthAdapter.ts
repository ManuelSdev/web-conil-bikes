// src/adapters/auth/firebaseAuthAdapter.ts
import {
   AuthPort,
   AuthUser,
   SessionCookieParams,
} from '@/core/domain/ports/authPort'
import { User } from '@/core/domain/models/user'
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'

app() // Inicializa Firebase

export const firebaseAuthAdapter: AuthPort = {
   async createAuthUser(
      userData: Partial<User> & { password: string }
   ): Promise<boolean> {
      try {
         await getAuth().createUser({
            email: userData.email,
            password: userData.password,
            displayName: userData.username,
         })
         return true
      } catch (error) {
         console.error('Firebase Admin - Error creating user:', error)
         return false
      }
   },

   async getAuthUser(authData: Partial<AuthUser>): Promise<AuthUser | null> {
      try {
         let userRecord
         if (authData.authId) {
            userRecord = await getAuth().getUser(authData.authId)
         } else if (authData.email) {
            userRecord = await getAuth().getUserByEmail(authData.email)
         }

         if (userRecord) {
            return {
               id: userRecord.uid,
               authId: userRecord.uid,
               username: userRecord.displayName || '',
               email: userRecord.email || '',
               userId: userRecord.uid,
               name: userRecord.displayName || '',
               phone: userRecord.phoneNumber || '',
               role: 'user',
            }
         }
         return null
      } catch (error) {
         console.error('Firebase Admin - Error getting user:', error)
         return null
      }
   },

   async deleteAuthUser(authData: Partial<AuthUser>): Promise<boolean> {
      try {
         let uid
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
   },

   async createSessionCookie(params: SessionCookieParams): Promise<string> {
      try {
         return await getAuth().createSessionCookie(params.token, {
            expiresIn: params.expiresIn * 1000,
         })
      } catch (error) {
         console.error('Firebase Admin - Error creating session cookie:', error)
         throw error
      }
   },

   async revokeUserAuthCredentials(userId: string): Promise<boolean> {
      try {
         await getAuth().revokeRefreshTokens(userId)
         return true
      } catch (error) {
         console.error('Firebase Admin - Error revoking refresh tokens:', error)
         return false
      }
   },

   async verifySessionCookie(cookie: string): Promise<AuthUser | null> {
      try {
         const decodedClaims = await getAuth().verifySessionCookie(cookie, true)
         if (decodedClaims?.uid) {
            const userRecord = await getAuth().getUser(decodedClaims.uid)
            return {
               id: userRecord.uid,
               authId: userRecord.uid,
               username: userRecord.displayName || '',
               email: userRecord.email || '',
            }
         }
         return null
      } catch (error) {
         return null
      }
   },

   async updateUserAuthProfile(
      updates: Partial<AuthUser> & { authId: string }
   ): Promise<boolean> {
      try {
         const updatePayload: Record<string, any> = {}
         if (updates.email) updatePayload.email = updates.email
         if (updates.username) updatePayload.displayName = updates.username

         await getAuth().updateUser(updates.authId, updatePayload)
         return true
      } catch (error) {
         console.error('Firebase Admin - Error updating user profile:', error)
         return false
      }
   },

   async getVerificationLink(user: Partial<AuthUser>): Promise<string> {
      if (!user.email) {
         throw new Error('Email is required to generate verification link.')
      }
      try {
         return await getAuth().generateEmailVerificationLink(user.email)
      } catch (error) {
         console.error(
            'Firebase Admin - Error generating verification link:',
            error
         )
         throw error
      }
   },
}
