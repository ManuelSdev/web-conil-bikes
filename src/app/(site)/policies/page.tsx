'use client'

import React from 'react'

export default function PrivacyPolicyPage() {
   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="mb-6 text-3xl font-bold">Política de Privacidad</h1>
         <p className="mb-4">
            En Conil Bikes, nos comprometemos a proteger tu privacidad y
            garantizar que tus datos personales sean tratados de manera segura y
            responsable. Esta política describe cómo recopilamos, usamos y
            protegemos tu información.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            1. Información que Recopilamos
         </h2>
         <ul className="mb-4 list-disc pl-6">
            <li>
               Datos personales como nombre, dirección de correo electrónico,
               número de teléfono y dirección.
            </li>
            <li>Información de pago para procesar tus reservas.</li>
            <li>
               Datos relacionados con tus reservas, como fechas y tipos de
               bicicletas alquiladas.
            </li>
         </ul>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            2. Cómo Usamos tu Información
         </h2>
         <ul className="mb-4 list-disc pl-6">
            <li>
               Para gestionar tus reservas y proporcionar nuestros servicios.
            </li>
            <li>
               Para comunicarnos contigo sobre tus reservas o responder a tus
               consultas.
            </li>
            <li>
               Para mejorar nuestros servicios y personalizar tu experiencia.
            </li>
         </ul>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            3. Compartir tu Información
         </h2>
         <p className="mb-4">
            No compartimos tus datos personales con terceros, excepto cuando sea
            necesario para procesar tus reservas (por ejemplo, procesadores de
            pago) o cuando lo exija la ley.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            4. Seguridad de tus Datos
         </h2>
         <p className="mb-4">
            Implementamos medidas de seguridad técnicas y organizativas para
            proteger tus datos personales contra el acceso no autorizado,
            pérdida o destrucción.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">5. Tus Derechos</h2>
         <ul className="mb-4 list-disc pl-6">
            <li>
               Acceder a tus datos personales y solicitar una copia de ellos.
            </li>
            <li>
               Solicitar la corrección o eliminación de tus datos personales.
            </li>
            <li>
               Oponerte al procesamiento de tus datos personales en ciertas
               circunstancias.
            </li>
         </ul>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">
            6. Cambios en esta Política
         </h2>
         <p className="mb-4">
            Nos reservamos el derecho de actualizar esta política de privacidad
            en cualquier momento. Te notificaremos sobre cualquier cambio
            publicando la nueva política en nuestro sitio web.
         </p>

         <h2 className="mt-6 mb-4 text-2xl font-semibold">7. Contacto</h2>
         <p className="mb-4">
            Si tienes preguntas o inquietudes sobre esta política de privacidad,
            puedes contactarnos en{' '}
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
            esta política de privacidad.
         </p>
      </div>
   )
}
