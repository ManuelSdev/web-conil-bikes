// @ts-nocheck
import { app } from '../firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'

export default async function createCustomTokenWithEmail(email) {
   app()
   try {
      //console.log('email -> ', email)
      const userRecord = await getAuth().getUserByEmail(email)
      const { uid } = userRecord
      const customToken = await getAuth().createCustomToken(uid)
      return customToken
   } catch (error) {
      //console.log('Error createCustomTokenWithEmail:', error)
      throw error
   }
}
