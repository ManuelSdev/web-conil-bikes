// Define la interfaz para los parámetros que recibe CustomError
interface CustomErrorParams {
   success: boolean
   message: string
   status: number
   type: string
   source: string
   error: {
      details: string
      code: string
      // Puedes agregar más propiedades específicas según necesites
   }
   rawError?: Error
}

export class CustomError extends Error {
   public success: boolean
   public status: number
   public type: string
   public source: string
   public error: {
      details: string
      code: string
   }
   public rawError: {
      message?: string
      stack?: string
      [key: string]: any
   } | null

   /**
    * Crea una nueva instancia de CustomError, extendiendo la clase Error para incorporar
    * información adicional relevante sobre la operación fallida.
    *
    * @param {CustomErrorParams} params - Objeto que contiene los detalles específicos del error:
    *   @property {boolean} success - Indica si la operación fue exitosa (típicamente false en caso de error).
    *   @property {string} message - Mensaje principal descriptivo del error.
    *   @property {number} status - Código de estado HTTP u otro indicador que refleja la severidad del error.
    *   @property {string} type - Categoría o tipo de error (por ejemplo, 'external', 'internal', etc.).
    *   @property {string} source - Fuente o módulo de origen del error (por ejemplo, 'firebase-admin/auth').
    *   @property {object} error - Objeto con detalles específicos del error, como un código y una descripción.
    *   @property {Error} [rawError] - Error original capturado (opcional), que puede incluir información adicional como la traza.
    */
   constructor({
      success,
      message,
      status,
      type,
      source,
      error,
      rawError,
   }: CustomErrorParams) {
      super(message)

      // Asignamos nuestras propiedades personalizadas
      this.success = success
      this.status = status
      this.type = type
      this.source = source
      this.error = error

      // Extraemos información útil del error original usando el encadenamiento opcional
      this.rawError = rawError
         ? {
              ...rawError,
              message: rawError?.message,
              stack: rawError?.stack,
              // Puedes extraer aquí cualquier otra propiedad importante
           }
         : null

      // Aseguramos correctamente la cadena de prototipos
      Object.setPrototypeOf(this, CustomError.prototype)

      // Capturamos la pila en el momento de instanciar el error (en entornos V8, como Node.js)
      if (Error.captureStackTrace) {
         Error.captureStackTrace(this, this.constructor)
      }
   }
}
