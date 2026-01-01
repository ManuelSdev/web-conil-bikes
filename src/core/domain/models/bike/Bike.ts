import { BikeSize, BikeType, BikeRange } from '@/types/bikeTypes'

export class Bike {
   id: string
   type: BikeType // Tipo de bicicleta (e.g., "mountain", "city", "electric", "road")
   size: BikeSize // Tamaño de la bicicleta (e.g., "s", "m", "l", "xl", "xxl")
   range: BikeRange // Rango o categoría (e.g., "top", "high", "mid", "ride")
   isAvailable: boolean // Disponibilidad de la bicicleta
   pricePerDay: number // Precio por día de alquiler

   constructor(
      id: string,
      type: BikeType,
      size: BikeSize,
      range: BikeRange,
      isAvailable: boolean,
      pricePerDay: number
   ) {
      this.id = id
      this.type = type
      this.size = size
      this.range = range
      this.isAvailable = isAvailable
      this.pricePerDay = pricePerDay
   }

   // Método para marcar la bicicleta como alquilada
   rentBike(): void {
      if (!this.isAvailable) {
         throw new Error('La bicicleta no está disponible para alquilar.')
      }
      this.isAvailable = false
   }

   // Método para devolver la bicicleta
   returnBike(): void {
      this.isAvailable = true
   }

   // Método para calcular el costo total del alquiler
   calculateRentalCost(days: number): number {
      if (days <= 0) {
         throw new Error('El número de días debe ser mayor a 0.')
      }
      return this.pricePerDay * days
   }
}
