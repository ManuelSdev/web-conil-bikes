// @ts-nocheck
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'
import { NextResponse } from 'next/server'

export async function POST(req) {
   const body = await req.json()
   //console.log('req.body en firebaseAdmin/createUser -------->', body)
   const { role = 'user', name, phone, email, password } = body

   //https://firebase.google.com/docs/auth/admin/email-action-links?hl=es&authuser=2#initialize_actioncodesettings
   const continueUrl = {
      url: 'http://localhost:3000/',
   }

   const newUser = {
      displayName: name,
      phoneNumber: '+34' + phone.toString(),
      email: email,
      password: password,
   }
   app()
   //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
   try {
      //Crear usuario en firebase
      const userRecord = await getAuth().createUser(newUser)

      const linkToControlPage = await getAuth().generateEmailVerificationLink(
         email,
         continueUrl
      )

      return NextResponse.json(
         { userRecord, linkToControlPage },
         { status: 201 }
      )
   } catch (error) {
      const { errorInfo } = error
      const { code, message } = errorInfo
      console.log(
         'Error creating new user en api/auth/firebaseAdmin/createUser -> ',
         errorInfo
      )
      return Response.json({ code }, { status: 500 })
   }
}
