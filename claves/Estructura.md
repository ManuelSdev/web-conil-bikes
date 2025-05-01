# Diferencia entre Servicios y Repositorios

La diferencia fundamental entre **servicios** y **repositorios** radica en sus responsabilidades dentro de la arquitectura de la aplicación:

## Repositorios

- **Propósito:**  
  Actúan como una interfaz abstracta para la persistencia de datos.

- **Responsabilidad:**  
  Se encargan de realizar operaciones CRUD (crear, leer, actualizar, eliminar) y de ocultar los detalles de acceso a la base de datos u otro sistema de almacenamiento.

- **Enfoque:**  
  Permiten que la capa de dominio trabaje con colecciones de objetos sin preocuparse por cómo ni dónde se almacenan los datos.

- **Ejemplo:**  
  Un `UserRepository` podría tener métodos como:
   - `findById(id: string)`: Busca y devuelve un usuario por su identificador.
   - `save(user: User)`: Guarda o actualiza la información de un usuario.
   - `delete(user: User)`: Elimina un usuario.

## Servicios

- **Propósito:**  
  Orquestan y aplican la **lógica de negocio** o de aplicación.

- **Responsabilidad:**  
  Encapsulan las reglas y procesos específicos del dominio, coordinando la interacción entre uno o varios repositorios y otras dependencias.

- **Enfoque:**  
  Se centran en ejecutar casos de uso o flujos de trabajo concretos, verificando condiciones, validando datos y garantizando que se cumplan las invariantes del negocio.

- **Ejemplo:**  
  Un `UserService` podría encargarse de la creación de un usuario. Para ello, usaría:
   - El `UserRepository` para guardar el usuario en la base de datos.
   - Validaciones específicas del negocio.
   - Notificaciones o interacciones con otros servicios, según corresponda.

## Resumen

- **Repositorios:**  
  Abstraen el acceso a la persistencia y permiten manipular datos independientemente de la infraestructura.

- **Servicios:**  
  Encapsulan la lógica y las reglas de negocio, coordinan casos de uso y, a menudo, utilizan los repositorios para gestionar datos.

Esta separación favorece la mantenibilidad, la escalabilidad y la capacidad de testeo de la aplicación, ya que cada capa se encarga de una responsabilidad específica.
