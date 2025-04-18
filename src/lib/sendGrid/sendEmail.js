import mail from '@sendgrid/mail'
//import basicEmailTemplate from '@/lib/emailTemplates/basicTemplate'

const sendGridSendEmail = async ({ to, subject, html }) => {
   mail.setApiKey(process.env.SENDGRID_API_KEY)

   const msg = {
      to, // Change to your recipient
      // Change to your verified sender
      from: {
         'email': 'masanchezzm@gmail.com',
         'name': 'Conil Bikes',
      },

      subject: 'BIenvenido a Conil Bikes',
      // text: 'Verifica tu email para finalizar el registro',
      html,
   }
   try {
      const sendgridResponse = await mail.send(msg)
      return sendgridResponse
   } catch (error) {
      console.log('**** error en sendGridSendEmail **** ')
      throw error
   }
}

export default sendGridSendEmail
