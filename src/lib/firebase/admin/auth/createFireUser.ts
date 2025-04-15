// @ts-nocheck
import React from 'react'
import { app } from '../firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'

export async function createFireUser({
   createdAppUserId,
   name,
   phone,
   email,
   password,
   emailVerified,
}) {
   app()
   //type de createdAppUserId
   //console.log('aaaaaaaaaaaaaaa', phone)

   const newUser = {
      // uid: createdAppUserId.toString(),
      displayName: name,
      phoneNumber: '+34' + phone.toString(),
      email: email,
      password: password,
      emailVerified: emailVerified,
   }
   try {
      const userRecord = await getAuth().createUser(newUser)
      return userRecord
   } catch (error) {
      //return error
      console.log('Error creating new user en createFireUser:', error)
      throw error
      throw Error({ ...error })
   }
}
