// @ts-nocheck
import { createFireUser } from '@/lib/firebase/admin/auth/createFireUser'
import { createAppUser } from '@/lib/pg/crud/users'
import getWelcomeEmail from '@/lib/react-email/welcome'
import sendGridSendEmail from '@/lib/sendGrid/sendEmail'

import { getAuth } from 'firebase-admin/auth'
import { NextResponse } from 'next/server'
/**
 *
 * @Clave: así puedes obtener custom claims en el server
 * https://firebase.google.com/docs/auth/admin/custom-claims?hl=es&authuser=2#defining_roles_via_backend_script
 * const fireUser = await getAuth().getUserByEmail(email)
 */

export async function POST(req) {
   console.log('API users/create/route.js ')
   //console.log('req.body -------->', req.method)
   const body = await req.json()
   const {
      role = 'user',
      name,
      phone,
      email,
      password,
      isCreatedByAdmin,
   } = body

   //https://firebase.google.com/docs/auth/admin/email-action-links?hl=es&authuser=2#initialize_actioncodesettings
   const continueUrl = {
      url: 'http://localhost:3000/',
   }

   //console.log('email en users api route -> ', email)
   console.log('isCreatedByAdmin -> ', isCreatedByAdmin)

   if (isCreatedByAdmin) {
      /**
       * TODO 1: cuando el user lo crea el admin, el addUser que se llama en createAppUser
       * le asigna user_active false en bdd, pero no toca el auth de firebase.
       *  CLAVE: manda correo igualmente
       */
      return await createAppUser({
         name,
         email,
         phone,
         role,
         isCreatedByAdmin,
      })
   } else {
      //https://firebase.google.com/docs/auth/admin/errors?hl=es-419
      /**
       * TODO 2 : si el user ya fue creado por un admin y, más adelante, el usuario se intenta
       * dar de alta por si mismo...esto no esta controlado
       * Deberías chequear, antes de del createFireUser, que exista un usuario en la bdd
       * con user_active false...e inventar algo para resolver esto
       *
       * O puedes, en el TODO 1 de arriba, crear al user en fierbase cuando el creador es el admin
       * y le pones algún custom claim, le mandas un correo, etc
       */
      try {
         const userRecord = await createFireUser({
            name,
            phone,
            email,
            password,
            emailVerified: false,
         })
         const { uid } = userRecord
         //Crear usuario en la base de datos de la app
         //TODO si falla, elimiar el usuario de firebase
         //Paso 2º parametro rawQuery=true para no recibir nextResponse
         const createdAppUserId = await createAppUser(
            {
               name,
               email,
               phone,
               role,
            },
            true
         )
         //Añado customClaim con el id de usuario de la base de datos de la app
         await getAuth().setCustomUserClaims(uid, {
            appUid: createdAppUserId,
            appRole: role,
         })
         //Compruebo que el customClaim se ha añadido
         const userRecordRes = await getAuth().getUser(uid)
         //console.log('userRecordRes en createUserAccount -> ', userRecordRes)
         //pillo el uid del usuario creado en firebase
         const linkToControlPage =
            await getAuth().generateEmailVerificationLink(email, continueUrl)

         const html = getWelcomeEmail({
            username: name,
            verifyEmailLink: linkToControlPage,
         })
         const to = email
         const subject = 'Bienvenido a Conil Bikes'
         const sendResult = await sendGridSendEmail({ to, subject, html })

         return NextResponse.json({ result: 'ok' }, { status: 201 })
      } catch (error) {
         console.log('error en createUserAccount -> ', error)
         // throw Error(error)
         return NextResponse.json(error, { status: 500 })
      }
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
