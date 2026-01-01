//ruta: src/domain/ports/notificationPort.ts
export interface NotificationPort {
   /**
    * Envía un email utilizando notificaciones.
    *
    * @param subject Asunto del email.
    * @param html Contenido HTML completo del email.
    * @param to Dirección de destino del email.
    * @returns Una promesa que se resuelve cuando el email se ha enviado exitosamente.
    */
   sendEmail(subject: string, html: string, to: string): Promise<void>
}
