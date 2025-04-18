const emails = (useremail, link) => ({
   //https://docs.sendgrid.com/api-reference/mail-send/mail-send#dynamic-transactional-templates-and-handlebars
   to: useremail, // Change to your recipient
   // Change to your verified sender
   from: {
      name: 'Conil Bikes',
      email: 'masanchezzm@gmail.com',
   },

   template_id: 'd-7e884b5e18244ecca2a8f97e608c958b',

   dynamic_template_data: {
      link: link,
      subject: 'Verifica tu cuenta de Conil Bikes',
   },
})
const emailMsg = ({ to, linkToControlPage }) => {
   const msg = {
      to: to, // Change to your recipient
      // Change to your verified sender
      from: 'masanchezzm@hotmai.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      hmtl: template(linkToControlPage),
   }
}
export default emails
