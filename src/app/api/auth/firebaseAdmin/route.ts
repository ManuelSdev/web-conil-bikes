// @ts-nocheck
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import { getAuth } from 'firebase-admin/auth'
import { NextResponse } from 'next/server'

export async function POST(req) {
   const body = await req.json()
   //console.log('req.body en firebaseAdmin/createUser -------->', body)
   const { action } = body

   const actions = {
      getUserByEmail: (body) => getUserByEmail(body),
      getUser: (body) => getUser(body),
      deleteUser: (body) => deleteUser(body),
      createUser: (body) => createUser(body),
      setCustomUserClaims: (body) => setCustomUserClaims(body),
      generateEmailVerificationLink: (body) =>
         generateEmailVerificationLink(body),
      createCustomToken: (body) => createCustomToken(body),
   }

   return await actions[action](body)
}

async function setCustomUserClaims(body) {
   app()
   const { uid, customClaims } = body
   try {
      await getAuth().setCustomUserClaims(uid, customClaims)
      return NextResponse.json({ succes: true }, { status: 201 })
   } catch (error) {
      console.log('Error setCustomUserClaims api/auth/firebaseAdmin -> ', error)
   }
}
async function createCustomToken(body) {
   app()
   const { uid } = body
   try {
      const customToken = await getAuth().createCustomToken(uid)
      return NextResponse.json({ customToken }, { status: 201 })
   } catch (error) {
      const { errorInfo } = error
      console.log(
         'Error createCustomToken api/auth/firebaseAdmin -> ',
         errorInfo
      )
      return Response.json(errorInfo, { status: 500 })
   }
}
async function getUser(body) {
   app()
   const { uid } = body
   try {
      const userRecord = await getAuth().getUser(uid)
      return Response.json(userRecord, { status: 201 })
   } catch (error) {
      const { errorInfo } = error
      console.log(
         'ROUTE HANDLER ERROR: /api/auth/firebaseAdmin/getUserData  ->',
         error.errorInfo
      )
      return Response.json(errorInfo, { status: 500 })
   }
}

async function getUserByEmail(body) {
   app()
   const { email } = body
   try {
      const userRecord = await getAuth().getUserByEmail(email)
      return Response.json(userRecord, { status: 201 })
   } catch (error) {
      const { errorInfo } = error
      console.log(
         'ROUTE HANDLER ERROR: /api/auth/firebaseAdmin/getUserData  ->',
         error.errorInfo
      )
      return Response.json(errorInfo, { status: 500 })
   }
}

async function deleteUser(body) {
   app()
   const { uid } = body
   try {
      await getAuth().deleteUser(uid)
      return NextResponse.json({ succes: true }, { status: 201 })
   } catch (error) {
      const { errorInfo } = error
      console.log(
         'ROUTE HANDLER ERROR: /api/auth/firebaseAdmin/getUserData  ->',
         error.errorInfo
      )
      return Response.json(errorInfo, { status: 500 })
   }
}

async function generateEmailVerificationLink(body) {
   app()
   const { email } = body
   //https://firebase.google.com/docs/auth/admin/email-action-links?hl=es&authuser=2#initialize_actioncodesettings
   const continueUrl = {
      url: 'http://localhost:3000/',
   }

   try {
      const linkToControlPage = await getAuth().generateEmailVerificationLink(
         email,
         continueUrl
      )

      return NextResponse.json({ linkToControlPage }, { status: 200 })
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

async function createUser(body) {
   app()
   const { name, email, phone, password } = body
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
   try {
      //Crear usuario en firebase
      const userRecord = await getAuth().createUser(newUser)

      return NextResponse.json({ userRecord }, { status: 201 })
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

/*
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
     //console.log(
         'Error creating new user en api/auth/firebaseAdmin/createUser -> ',
         errorInfo
      )
      return Response.json({ code }, { status: 500 })
   }
   */
