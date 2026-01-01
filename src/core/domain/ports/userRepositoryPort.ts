//ruta: src/domain/ports/userRepositoryPort.ts
import { User } from '@/core/domain/models/user'

/**
 * Puerto para las operaciones de persistencia de usuarios.
 *
 * Este puerto (UserRepositoryPort) define las acciones CRUD sobre el modelo User.
 * Actualmente, la implementación se realizará mediante un repositorio con consultas directas a PostgreSQL.
 * En el futuro, se podrá cambiar el adaptador para operar mediante una API externa sin afectar la lógica de negocio.
 */
export interface UserRepositoryPort {
   /**
    * Crea un nuevo usuario en la persistencia.
    *
    * @param user Objeto parcial de User con los datos necesarios para la creación.
    * @returns Promesa que se resuelve en el objeto User creado, con todos los datos (incluido su identificador asignado).
    */
   createUser(user: Partial<User>): Promise<User>

   /**
    * Obtiene un usuario a partir de su identificador.
    *
    * @param userId Identificador único del usuario en la base de datos.
    * @returns Promesa que se resuelve en el objeto User encontrado, o null si no existe.
    */
   getUser(userId: string): Promise<User | null>

   /**
    * Actualiza los datos de un usuario existente.
    *
    * @param userId Identificador único del usuario a actualizar.
    * @param updates Objeto parcial de User que contiene únicamente los campos a modificar.
    * @returns Promesa que se resuelve en el objeto User actualizado.
    */
   updateUser(userId: string, updates: Partial<User>): Promise<User>

   /**
    * Elimina un usuario de la persistencia.
    *
    * @param userId Identificador único del usuario a eliminar.
    * @returns Promesa que se resuelve en true si la eliminación fue exitosa, o false en caso de fallo.
    */
   deleteUser(userId: string): Promise<boolean>

   /**
    * Opcionalmente, lista todos los usuarios.
    *
    * @returns Promesa que se resuelve en un array con todos los objetos User.
    */
   listUsers?(): Promise<User[]>
}
