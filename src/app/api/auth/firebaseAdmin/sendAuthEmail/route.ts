// @ts-nocheck
import { app } from '@/lib/firebase/admin/firebaseAdmin'
import sendGridSendEmail from '@/lib/sendGrid/sendEmail'
import { getAuth } from 'firebase-admin/auth'

export async function GET(req) {
   const searchParams = req.nextUrl.searchParams
   const email = searchParams.get('email')
   const name = searchParams.get('name')
   const type = searchParams.get('type')
   const actionCodeSettings = {
      url: 'http://localhost:3000/',
   }
   app()
   try {
      //Si no me llega el name, lo pillo
      const userName = name ? name : await getUserName(email)
      const { linkToControlPage, buttonText, firstMessage } =
         await getEmailConfig({
            email,
            actionCodeSettings,
            type,
         })
      //console.log('linkToControlPage -> ', linkToControlPage)
      const sendgridResponse = await sendGridSendEmail({
         userName,
         buttonLink: linkToControlPage,
         buttonText,
         to: email,
         firstMessage,
      })
      console.log(
         'Email enviado desde VerifyEmailFormPageHandler VIA /api/auth/firebaseAdmin/sendResetEmail -> ',
         sendgridResponse
      )
      return Response.json({ success: true }, { status: 200 })
   } catch (error) {
      console.log(
         'ROUTE HANDLER ERROR: /api/auth/firebaseAdmin/sendResetEmail  ->',
         error
      )
      //return redirectToUnauthorized()
      Response.json(error, { status: 500 })
   }
}
function getButtonText(type) {
   if (type === 'verify') {
      return 'Verificar email'
   }
   if (type === 'reset') {
      return 'Cambiar contraseña'
   }
}
async function getEmailConfig({ email, actionCodeSettings, type }) {
   if (type === 'verify') {
      const linkToControlPage = await getAuth().generateEmailVerificationLink(
         email,
         actionCodeSettings
      )
      return {
         linkToControlPage,
         buttonText: 'Verificar email',
         firstMessage:
            'Haz click en el botón para verificar tu email y finalizar el registro',
      }
   }

   if (type === 'reset') {
      const linkToControlPage = await getAuth().generatePasswordResetLink(
         email,
         actionCodeSettings
      )
      return {
         linkToControlPage,
         buttonText: 'Cambiar contraseña',
         firstMessage: 'Haz click en el botón para cambiar tu contraseña',
      }
   }
}

async function getUserName(email) {
   const userRecord = await getAuth().getUserByEmail(email)
   return userRecord.displayName
}
