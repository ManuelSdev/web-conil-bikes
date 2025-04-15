// @ts-nocheck
import React from 'react'
import { app } from './firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'

export async function verifySessionCookie(sessionCookie) {
   app()
   //Si verififySessionCookie falla, devuelve un error
   //Fallará si la cookie expira o si la firma de la cookie no es válida
   try {
      const decodeClaims = await getAuth().verifySessionCookie(sessionCookie)
      // console.log('decodeClaims ->>>', decodeClaims)
      return decodeClaims
   } catch (error) {
      throw error
   }
}
