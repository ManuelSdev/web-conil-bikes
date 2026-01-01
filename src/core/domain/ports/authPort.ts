//ruta: src/domain/ports/authPort.ts

// Importas el tipo User desde tu dominio
import { User } from '@/core/domain/models/user'
/**
 * Interfaz que representa un usuario autenticado.
 *
 * Esta interfaz extiende la interfaz User, añadiendo la propiedad authId
 * que representa el identificador único del usuario en el proveedor de autenticación.
 */

export interface AuthUser extends User {
   authId: string // Puedes definirlo como obligatorio o, si lo prefieres, hacerlo opcional: authId?: string;
}

/**
 * Parámetros para la creación de la cookie de sesión.
 */
export interface SessionCookieParams {
   token: string
   expiresIn: number // Duración de la cookie en segundos (o la unidad que uses)
}

export interface AuthPort {
   /**
    * Crea un usuario en el proveedor de autenticación.
    * @param userData Un objeto parcial de tipo User que, además, debe incluir la propiedad `password`.
    * @returns Promesa que se resuelve en true si la creación fue exitosa, o false en caso contrario.
    */
   createAuthUser(
      userData: Partial<User> & { password: string }
   ): Promise<boolean>

   /**
    * Obtiene el usuario de autenticación a partir de un objeto que contiene algunos criterios identificadores (por ejemplo, authId o email).
    *
    * @param authData Un objeto parcial de AuthUser que especifica los criterios de búsqueda.
    * @returns Promesa que se resuelve en el objeto AuthUser completo si se encuentra o null en caso contrario.
    */
   getAuthUser(authData: Partial<AuthUser>): Promise<AuthUser | null>

   /**
    * Elimina el usuario de autenticación utilizando criterios identificadores.
    *
    * @param authData Objeto parcial de AuthUser que contiene los datos necesarios para identificar al usuario (por ejemplo, authId o email).
    * @returns Promesa que se resuelve en true si la eliminación fue exitosa, o false en caso contrario.
    */
   deleteAuthUser(authData: Partial<AuthUser>): Promise<boolean>

   /**
    * Crea una cookie de sesión a partir del objeto de parámetros proporcionado.
    *
    * En implementaciones concretas (como Firebase), este método recibirá el objeto que
    * incluye el token obtenido desde el cliente y la duración en la que la cookie será válida
    * (expiresIn), utilizará la función correspondiente (por ejemplo, createSessionCookie)
    * y devolverá el valor de la cookie generada para gestionar la sesión.
    *
    * @param params Objeto que contiene el token y la duración de expiración de la cookie.
    * @returns Promesa que se resuelve en la cookie de sesión generada (valor string).
    */
   createSessionCookie(params: SessionCookieParams): Promise<string>

   /**
    * Revoca las credenciales de autenticación del usuario.
    * @param userId Identificador del usuario.
    * @returns Promesa que se resuelve en true si se revocaron correctamente, o false de lo contrario.
    */
   revokeUserAuthCredentials(userId: string): Promise<boolean>

   /**
    * Verifica la cookie de sesión y devuelve el usuario de autenticación asociado.
    *
    * Este método toma el valor de la cookie de sesión, valida su integridad y extrae la información
    * del usuario autenticado, retornándolo como un objeto AuthUser. En caso de que la cookie sea inválida
    * o haya expirado, la promesa se resuelve en null.
    *
    * @param cookie Valor de la cookie de sesión.
    * @returns Promesa que se resuelve en el objeto AuthUser si la cookie es válida, o null en caso contrario.
    */
   verifySessionCookie(cookie: string): Promise<AuthUser | null>

   /**
    * Actualiza el perfil de autenticación en el proveedor.
    *
    * Nota sobre el tipado:
    * El parámetro `updates` tiene el tipo `Partial<AuthUser> & { authId: string }`, lo que significa que:
    * - `Partial<AuthUser>` convierte todas las propiedades de `AuthUser` en opcionales.
    * - Con `& { authId: string }` se exige que la propiedad `authId` esté presente en el objeto.
    *
    * Esto permite que se pueda actualizar únicamente aquellas propiedades que se deseen modificar,
    * siempre garantizando que se incluya el identificador (`authId`) para identificar al usuario.
    *
    * @param updates Objeto que contiene el `authId` obligatorio junto con las demás propiedades opcionales a actualizar.
    * @returns Promesa que se resuelve en true si la actualización del perfil fue exitosa, o false en caso de fallo.
    */
   updateUserAuthProfile(
      updates: Partial<AuthUser> & { authId: string }
   ): Promise<boolean>

   /**
    * Genera un enlace de verificación para una cuenta de usuario.
    *
    * Este método recibe un objeto parcial de `AuthUser` que debe incluir los campos
    * esenciales (por ejemplo, `email`, `userId` o similares) necesarios para construir
    * un enlace único de verificación. Dicho enlace se espera usarlo para que el usuario
    * confirme su cuenta a través del email.
    *
    * @param user Objeto parcial de `AuthUser` con la información requerida para la verificación.
    * @returns Una promesa que se resuelve en el enlace de verificación (string).
    */
   getVerificationLink(user: Partial<AuthUser>): Promise<string>

   //isEmailVerified(authId: string): Promise<boolean>
}
