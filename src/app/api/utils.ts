//@ts-nocheck
import 'server-only'
import { NextResponse } from 'next/server'

export const getErrorResponseObj = (error) => {
   let errorMessage

   try {
      errorMessage = JSON.parse(error.message)
   } catch (parseError) {
      //Si no se puede parsear el error, se maneja como un error desconocido
      errorMessage = {
         success: false,
         message: error.message || 'Error inesperado',
         code: 'UNKNOWN_ERROR',
      }
   }
   const { success, message, code, status } = errorMessage
   delete error.message
   console.error('Error capturado: ', errorMessage, error)
   return { success, message, code, status: status || 500 }
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
