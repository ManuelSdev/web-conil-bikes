const getWelcomeEmail = ({ username, verifyEmailLink }) =>
   `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
   <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
   </head>
   <div
      style="
         display: none;
         overflow: hidden;
         line-height: 1px;
         opacity: 0;
         max-height: 0;
         max-width: 0;
      "
   >
      Verifica tu email para finalizar el registro
      <div>
          ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
   </div>
   <body
      style="
         background-color: rgb(255, 255, 255);
         margin-top: auto;
         margin-bottom: auto;
         margin-left: auto;
         margin-right: auto;
         font-family:
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            'Helvetica Neue',
            Arial,
            'Noto Sans',
            sans-serif,
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'Noto Color Emoji';
         padding-left: 0.5rem;
         padding-right: 0.5rem;
      "
   >
      <table
         align="center"
         width="100%"
         border="0"
         cellpadding="0"
         cellspacing="0"
         role="presentation"
         style="
            max-width: 465px;
            border-width: 1px;
            border-style: solid;
            border-color: rgb(234, 234, 234);
            border-radius: 0.25rem;
            margin-top: 40px;
            margin-bottom: 40px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
         "
      >
         <tbody>
            <tr style="width: 100%">
               <td>
                  <table
                     align="center"
                     width="100%"
                     border="0"
                     cellpadding="0"
                     cellspacing="0"
                     role="presentation"
                  >
                     <tbody>
                        <tr>
                           <td>
                              <div
                                 style="
                                    background-color: rgb(0, 0, 0);
                                    width: 100%;
                                    height: 0.5rem;
                                 "
                              ></div>
                              <div
                                 style="
                                    background-color: hsl(73, 100%, 63%, 1);
                                    width: 100%;
                                    height: 0.125rem;
                                 "
                              ></div>
                              <div
                                 style="
                                    background-color: rgb(0, 0, 0);
                                    width: 100%;
                                    height: 0.5rem;
                                 "
                              ></div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <table
                     align="center"
                     width="100%"
                     border="0"
                     cellpadding="0"
                     cellspacing="0"
                     role="presentation"
                  >
                     <tbody>
                        <tr>
                           <td>
                              <div
                                 class=" "
                                 style="
                                    margin-top: 32px;
                                    margin-left: auto;
                                    margin-right: auto;
                                    height: 4rem;
                                    width: 4rem;
                                    background-image: url('https://res.cloudinary.com/dbiykfxsf/image/upload/v1710951692/email-logo_gnmys7.png');
                                    background-position: center;
                                    background-repeat: no-repeat;
                                    background-size: contain;
                                    border-radius: 25% 10%;
                                    border-width: 4px;
                                    border-style: solid;
                                    border-color: hsl(73, 100%, 63%, 1);
                                    background-color: rgb(0, 0, 0);
                                    fill: hsl(73, 100%, 63%, 1);
                                 "
                              ></div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <h1
                     class=""
                     style="
                        color: rgb(0, 0, 0);
                        font-size: 24px;
                        font-weight: 400;
                        text-align: center;
                        padding: 0px;
                        margin-top: 30px;
                        margin-bottom: 30px;
                        margin-left: 0px;
                        margin-right: 0px;
                     "
                  >
                     Bienvenidossss a <strong>Conil Bikes</strong>
                  </h1>
                  <p
                     style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                     "
                  >
                     Hola ${username},
                  </p>
                  <p
                     style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                     "
                  >
                     Gracias por unirte a <strong>Conil Bikes</strong>. Para
                     finalizar el registro, pulsa el siguiente botón de
                     verificación:
                  </p>
                  <table
                     align="center"
                     width="100%"
                     border="0"
                     cellpadding="0"
                     cellspacing="0"
                     role="presentation"
                     style="
                        text-align: center;
                        margin-top: 32px;
                        margin-bottom: 32px;
                     "
                  >
                     <tbody>
                        <tr>
                           <td>
                              <a
                                 href="${verifyEmailLink}"
                                 style="
                                    line-height: 100%;
                                    text-decoration: none;
                                    display: inline-block;
                                    max-width: 100%;
                                    background-color: rgb(0, 0, 0);
                                    border-radius: 0.25rem;
                                    color: hsl(73, 100%, 63%, 1);
                                    font-size: 12px;
                                    font-weight: 600;
                                    text-decoration-line: none;
                                    text-align: center;
                                    padding-left: 1.25rem;
                                    padding-right: 1.25rem;
                                    padding-top: 0.75rem;
                                    padding-bottom: 0.75rem;
                                    padding: 12px 20px 12px 20px;
                                 "
                                 target="_blank"
                                 ><span
                                    ><!--[if mso
                                       ]><i
                                          style="
                                             letter-spacing: 20px;
                                             mso-font-width: -100%;
                                             mso-text-raise: 18;
                                          "
                                          hidden
                                          >&nbsp;</i
                                       ><!
                                    [endif]--></span
                                 ><span
                                    style="
                                       max-width: 100%;
                                       display: inline-block;
                                       line-height: 120%;
                                       mso-padding-alt: 0px;
                                       mso-text-raise: 9px;
                                    "
                                    >Verificar email</span
                                 ><span
                                    ><!--[if mso
                                       ]><i
                                          style="
                                             letter-spacing: 20px;
                                             mso-font-width: -100%;
                                          "
                                          hidden
                                          >&nbsp;</i
                                       ><!
                                    [endif]--></span
                                 ></a
                              >
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <p
                     style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                     "
                  >
                     Saludos.
                  </p>
                  <p
                     style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                     "
                  >
                     The<strong> Conil Bikes</strong> Team
                  </p>
                  <hr
                     style="
                        width: 100%;
                        border: none;
                        border-top: 1px solid #eaeaea;
                        border-width: 1px;
                        border-style: solid;
                        border-color: rgb(234, 234, 234);
                        margin-top: 26px;
                        margin-bottom: 26px;
                        margin-left: 0px;
                        margin-right: 0px;
                     "
                  />
                  <table
                     align="center"
                     width="100%"
                     class=" "
                     border="0"
                     cellpadding="0"
                     cellspacing="0"
                     role="presentation"
                     style="background-color: rgb(0, 0, 0)"
                  >
                     <tbody>
                        <tr>
                           <td>
                              <table
                                 align="center"
                                 width="100%"
                                 class=""
                                 border="0"
                                 cellpadding="0"
                                 cellspacing="0"
                                 role="presentation"
                                 style="
                                    background-color: rgb(0, 0, 0);
                                    padding-top: 0.25rem;
                                    padding-bottom: 0.25rem;
                                    width: 70%;
                                 "
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          class=""
                                          data-id="__react-email-column"
                                       >
                                          <a
                                             href="https://twitter.com/home"
                                             class="align-center"
                                             style="
                                                color: #067df7;
                                                text-decoration: none;
                                                display: flex;
                                             "
                                             target="_blank"
                                             ><img
                                                class=""
                                                src="https://res.cloudinary.com/dbiykfxsf/image/upload/v1710957609/facebook-32_kb49en.png"
                                                style="
                                                   display: block;
                                                   outline: none;
                                                   border: none;
                                                   text-decoration: none;
                                                   height: 2rem;
                                                   width: 2rem;
                                                   margin-left: auto;
                                                   margin-right: auto;
                                                "
                                          /></a>
                                       </td>
                                       <td
                                          class=""
                                          data-id="__react-email-column"
                                       >
                                          <a
                                             href="https://twitter.com/home"
                                             class="align-center"
                                             style="
                                                color: #067df7;
                                                text-decoration: none;
                                                display: flex;
                                             "
                                             target="_blank"
                                             ><img
                                                class=""
                                                src="https://res.cloudinary.com/dbiykfxsf/image/upload/v1710957611/instagram-32_trx3mq.png"
                                                style="
                                                   display: block;
                                                   outline: none;
                                                   border: none;
                                                   text-decoration: none;
                                                   height: 2rem;
                                                   width: 2rem;
                                                   margin-left: auto;
                                                   margin-right: auto;
                                                "
                                          /></a>
                                       </td>
                                       <td
                                          class=""
                                          data-id="__react-email-column"
                                       >
                                          <a
                                             href="https://twitter.com/home"
                                             class="align-center"
                                             style="
                                                color: #067df7;
                                                text-decoration: none;
                                                display: flex;
                                             "
                                             target="_blank"
                                             ><img
                                                class=""
                                                src="https://res.cloudinary.com/dbiykfxsf/image/upload/v1710957614/twitter-32png_e0qcvg.png"
                                                style="
                                                   display: block;
                                                   outline: none;
                                                   border: none;
                                                   text-decoration: none;
                                                   height: 2rem;
                                                   width: 2rem;
                                                   margin-left: auto;
                                                   margin-right: auto;
                                                "
                                          /></a>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   </body>
</html>

`
export default getWelcomeEmail
