// @ts-nocheck
import { createFireUser } from '@/lib/firebase/admin/auth/createFireUser'
import { createAppUser } from '@/lib/pg/crud/users'
import getWelcomeAdminEmail from '@/lib/react-email/welcomeAdmin'
import sendGridSendEmail from '@/lib/sendGrid/sendEmail'
import { generatePassword } from '@/utils/app/functions'
import { tr } from 'date-fns/locale'

import { getAuth } from 'firebase-admin/auth'
import { NextResponse } from 'next/server'
/**
 *
 * @Clave: así puedes obtener custom claims en el server
 * https://firebase.google.com/docs/auth/admin/custom-claims?hl=es&authuser=2#defining_roles_via_backend_script
 * const fireUser = await getAuth().getUserByEmail(email)
 */

export async function POST(req) {
   //console.log('req.body -------->', req.method)
   const body = await req.json()
   const { role = 'user', name, phone, email } = body

   //https://firebase.google.com/docs/auth/admin/email-action-links?hl=es&authuser=2#initialize_actioncodesettings
   const continueUrl = {
      url: 'http://localhost:3000/',
   }

   console.log('email en users api route -> ', email)
   //crea random password
   const password = generatePassword()
   try {
      const userRecord = await createFireUser({
         name,
         phone,
         email,
         password,
         emailVerified: true,
      })
      const { uid } = userRecord
      //Crear usuario en la base de datos de la app
      //TODO si falla, elimiar el usuario de firebase
      const createdAppUserId = await createAppUser({ name, email, phone, role })
      //Añado customClaim con el id de usuario de la base de datos de la app
      await getAuth().setCustomUserClaims(uid, {
         appUid: createdAppUserId,
         appRole: role,
      })
      //Compruebo que el customClaim se ha añadido
      const userRecordRes = await getAuth().getUser(uid)
      //console.log('userRecordRes en createUserAccount -> ', userRecordRes)
      //No necesito el uid del usuario creado en firebase porque no
      //necesito mandar un correo de verificación
      /*
      const linkToControlPage = await getAuth().generateEmailVerificationLink(
         email,
         continueUrl
      )
      */
      const html = getWelcomeAdminEmail({ username: name, email, password })
      const to = email
      const subject = 'Bienvenido a Conil Bikes'
      const sendResult = await sendGridSendEmail({ to, subject, html })
      console.log('usuario creado en firebase -> ', userRecordRes)
      return NextResponse.json({ result: 'ok' }, { status: 201 })
   } catch (error) {
      console.log('### ERROR USERS API route -> ', error)
      return NextResponse.json(error, { status: 500 })
   }
}

/*
async function sendSengridEmail({ userName, buttonLink, to }) {
   mail.setApiKey(process.env.SENDGRID_API_KEY)
   const mailTemplateConfig = {
      userName,
      firstMessage:
         'Haz click en el botón para verificar tu email y finalizar el registro',
      buttonText: 'Verificar email',
      buttonLink,
   }

   const emailHtml = basicEmailTemplate(mailTemplateConfig)
   //console.log('emailHtml -> ', emailHtml)
   // const html = emailTemplate('linkToControlPage')
   try {
      const msg = {
         to, // Change to your recipient
         // Change to your verified sender
         from: 'masanchezzm@gmail.com',
         subject: 'BIenvenido a Conil Bikes',
         // text: 'Verifica tu email para finalizar el registro',
         html: emailHtml,
      }
      const sendgridResponse = await mail.send(msg)
      return sendgridResponse
   } catch (error) {
      const {
         response: { body: errors },
      } = error
     //console.log('### ERROR sendgridResponse API route -> ', errors)
      throw new Error(errors)
   }
}
*/
