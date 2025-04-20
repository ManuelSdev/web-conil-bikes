//@ts-nocheck
import 'server-only'
import { NextResponse } from 'next/server'

export const getErrorResponseObj = (err) => {
   let errorMessage

   try {
      errorMessage = JSON.parse(err.message)
   } catch (parseError) {
      //Si no se puede parsear el error, se maneja como un error desconocido
      errorMessage = {
         success: false,
         message: err.message || 'Error inesperado',
         error: {
            details:
               err.error.details || 'Generic error by non parseable error',
            code: err.error.code || 'UNKNOWN_ERROR',
         },
      }
   }
   const { success, message, error, status } = errorMessage
   delete err.message
   console.error('Error capturado: ', errorMessage, err)
   return { success, message, error, status: status || 500 }
}
/*
Si errorObj contiene la propiedad 'rawError', se imprime de forma formateada.
Esto es por si la consola no imprime objetos animados.
   if ('rawError' in errorMessage) {
      console.error('Error capturado:', JSON.stringify(errorMessage, null, 2))
   } else {
      delete error.message
      console.error('Error capturado: ', errorMessage, error)
   }
*/
