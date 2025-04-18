import { BIKE_RANGES_MAP, BIKE_TYPES_MAP } from '@/utils/app/appValues'
import { format } from 'date-fns'

const createBikeList = (bikes) => {
   let bikeList = ''
   bikes.forEach((bike, idx) => {
      const {
         modelBrand,
         modelName,
         modelType,
         modelRange,
         bikeSize: size,
         price,
         modelImages,
      } = bike

      const imageUrl = modelImages[0]
      const name = `${modelBrand} ${modelName}`
      const type = BIKE_TYPES_MAP[modelType]
      const range = BIKE_RANGES_MAP[modelRange]
      const length = bikes.length
      const marginTop = idx === 0 ? '0' : '0.5rem'
      const bikeText = `

      <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="margin-top: ${marginTop}"
      >
         <tbody style="width: 100%">
            <tr style="width: 100%">
               <td
                  data-id="__react-email-column"
                  style="
                     width: 20%;
                     background-color: rgb(
                        241,
                        241,
                        241
                     );
                  "
               >
                  <a
                     href="${imageUrl}"
                     style="
                        color: #067df7;
                        text-decoration: none;
                     "
                     target="_blank"
                     ><img
                        alt="Cat"
                        src="${imageUrl}"
                        style="
                           display: block;
                           outline: none;
                           border: none;
                           text-decoration: none;
                        "
                        width="100%"
                     />
                  </a>
               </td>
               <td
                  data-id="__react-email-column"
                  style="
                     vertical-align: baseline;
                     padding-left: 1rem;
                     color: rgb(0, 0, 0);
                  "
               >
                  <div><strong>${name}</strong></div>
                  <div>
                     Tipo: <strong>${type}</strong>
                  </div>
                  <div>
                     Gama: <strong>${range}</strong>
                  </div>
                  <div>
                     Talla: <strong>${size}</strong>
                  </div>
               </td>
               <td
                  data-id="__react-email-column"
                  style="
                     vertical-align: baseline;
                     text-align: right;
                  "
               >
                  <strong>${price}</strong> €/dia
               </td>
            </tr>
         </tbody>
   
      
      </table>
      

    `
      bikeList += bikeText
   })
   return bikeList
}
const getOrderResumeEmail = ({
   name,
   phone,
   email,
   address,
   delivery: del,
   pickup: pick,
   bikesByUnits: bikes,
   dateRangeObj: dateRange,
   dayPrice,
   bookingPrice,
   duration,
   bookingId,
}) => {
   // console.log('bikes en orderResume ->', bikes)
   const bikeList = createBikeList(bikes)
   //console.log('dateRange en orderResume ->', dateRange)
   const date = `Del ${format(
      new Date(dateRange.from),
      'dd/MM/yyyy'
   )} al ${format(new Date(dateRange.to), 'dd/MM/yyyy')}`

   const delivery = del
      ? 'Entrega de bicicletas en tienda el día de inicio de la reserva'
      : 'Entrega de bicicletas a domicilio el día previo al inicio de la reserva'

   const pickup = pick
      ? 'Recogida de bicicletas en tienda el día de finalización de la reserva'
      : 'Recogida de bicicletas a domicilio el día posterior al final de la reserva'

   return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      Confirmación Conil Bikes
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
         color: rgb(0, 0, 0);
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
                     style="margin-top: 32px"
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
                        text-align: left;
                        padding: 0px;
                        margin-top: 30px;
                        margin-bottom: 30px;
                        margin-left: 0px;
                        margin-right: 0px;
                     "
                  >
                     Confirmación de tu reserva
                  </h1>
                  <p
                     style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                     "
                  >
                     Hola ${name},
                  </p>
                  <p
                     style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        color: rgb(0, 0, 0);
                     "
                  >
                     Gracias por tu reserva. A continuación, te mostramos los
                     detalles de la misma:
                  </p>
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
                              <table
                                 align="center"
                                 width="100%"
                                 border="0"
                                 cellpadding="0"
                                 cellspacing="0"
                                 role="presentation"
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             width: 20%;
                                             vertical-align: baseline;
                                          "
                                       >
                                          <strong>Código:</strong>
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>${bookingId}</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             width: 20%;
                                             vertical-align: baseline;
                                          "
                                       >
                                          Nombre:
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>${name}</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             width: 20%;
                                             vertical-align: baseline;
                                          "
                                       >
                                          Teléfono:
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>${phone}</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             width: 20%;
                                             vertical-align: baseline;
                                          "
                                       >
                                          Dirección:
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>${address}</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             width: 20%;
                                             vertical-align: baseline;
                                          "
                                       >
                                          Fecha:
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>${date}</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             width: 20%;
                                             vertical-align: baseline;
                                          "
                                       >
                                          Entrega:
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>${delivery}</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          data-id="__react-email-column"
                                          style="width: 20%"
                                          vertical-align: baseline;
                                       >
                                          Recogida:
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>${pickup}</strong>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
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
                                 ${bikeList}
                                 
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
                                 border="0"
                                 cellpadding="0"
                                 cellspacing="0"
                                 role="presentation"
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          class=""
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          Importe total por día
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             vertical-align: baseline;
                                             text-align: right;
                                          "
                                       >
                                          <strong>${dayPrice} €</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          class=""
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          Duración de la reserva
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             vertical-align: baseline;
                                             text-align: right;
                                          "
                                       >
                                          <strong>${duration} días</strong>
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
                                 color: rgb(0, 0, 0);
                              >
                                 <tbody style="width: 100%">
                                    <tr style="width: 100%">
                                       <td
                                          class=""
                                          data-id="__react-email-column"
                                          style="vertical-align: baseline"
                                       >
                                          <strong>Importe total</strong>
                                       </td>
                                       <td
                                          data-id="__react-email-column"
                                          style="
                                             vertical-align: baseline;
                                             text-align: right;
                                          "
                                       >
                                          <strong>${bookingPrice} €</strong>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
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
}

export default getOrderResumeEmail
