'use client'

import React from 'react'

export default function TermsOfServicePage() {
   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="mb-6 text-3xl font-bold">Términos y Condiciones</h1>
         <p className="mb-4">
            Bienvenido a Conil Bikes. Al utilizar nuestros servicios de alquiler
            de bicicletas, aceptas los siguientes términos y condiciones. Por
            favor, léelos detenidamente antes de realizar una reserva.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            1. Uso del Servicio
         </h2>
         <p className="mb-4">
            Conil Bikes ofrece servicios de alquiler de bicicletas para uso
            recreativo y personal. No está permitido utilizar nuestras
            bicicletas para actividades ilegales, peligrosas o comerciales sin
            autorización previa.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            2. Reservas y Pagos
         </h2>
         <ul className="mb-4 list-disc pl-6">
            <li>
               Las reservas deben realizarse a través de nuestra página web o en
               nuestras oficinas físicas.
            </li>
            <li>El pago debe completarse antes de recoger la bicicleta.</li>
            <li>
               No se realizarán reembolsos por cancelaciones hechas con menos de
               24 horas de antelación.
            </li>
         </ul>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            3. Responsabilidad del Usuario
         </h2>
         <ul className="mb-4 list-disc pl-6">
            <li>
               El usuario es responsable de la bicicleta durante el período de
               alquiler.
            </li>
            <li>
               En caso de pérdida, robo o daño, el usuario deberá cubrir los
               costos de reparación o reemplazo.
            </li>
            <li>
               Es obligatorio el uso de casco y respetar las normas de tráfico
               locales.
            </li>
         </ul>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            4. Política de Privacidad
         </h2>
         <p className="mb-4">
            En Conil Bikes respetamos tu privacidad. Los datos personales
            recopilados durante el proceso de reserva se utilizarán únicamente
            para gestionar tu alquiler y no se compartirán con terceros sin tu
            consentimiento.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            5. Modificaciones del Servicio
         </h2>
         <p className="mb-4">
            Conil Bikes se reserva el derecho de modificar o cancelar reservas
            en caso de circunstancias imprevistas, como condiciones climáticas
            adversas o problemas técnicos.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">6. Contacto</h2>
         <p className="mb-4">
            Si tienes alguna pregunta sobre estos términos, puedes contactarnos
            en{' '}
            <a
               href="mailto:info@conilbikes.com"
               className="text-blue-500 underline"
            >
               info@conilbikes.com
            </a>
            .
         </p>

         <p className="mt-8">
            Al utilizar nuestros servicios, confirmas que has leído y aceptado
            estos términos y condiciones.
         </p>
      </div>
   )
}
