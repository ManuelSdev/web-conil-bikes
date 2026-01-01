//ruta: src/domain/models/user/user.ts
export interface User {
   userId: string
   email: string
   name: string
   phone: string
   role: string
   [key: string]: any // Para propiedades adicionales
}

export const createUser = (userData: {
   userId: string
   email: string
   name: string
   phone: string
   role: string
   [key: string]: any // Para propiedades adicionales
}): User => {
   const { userId, email, name, phone, role } = userData
   // Validación básica, por ejemplo:
   if (!email.includes('@')) {
      throw new Error('Email inválido')
   }
   return { userId, email: email.toLowerCase(), name, phone, role }
}
