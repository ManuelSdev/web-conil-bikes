type Size = 's' | 'm' | 'l' | 'xl' | 'xxl'
type SizeRange = [number, number]
type BikeType = 'mountain' | 'city' | 'electric' | 'road'
type BikeRange = 'top' | 'high' | 'mid' | 'ride'
type State = 'pending' | 'active' | 'finished' | 'cancelled'
type BookingState = 'pendiente' | 'activa' | 'finalizada' | 'cancelada'

export enum BookingStateEnum {
   PENDING = 'pending',
   ACTIVE = 'active',
   FINISHED = 'finished',
   CANCELLED = 'cancelled',
}

export const bookingState: Record<BookingStateEnum, BookingState> = {
   [BookingStateEnum.PENDING]: 'pendiente',
   [BookingStateEnum.ACTIVE]: 'activa',
   [BookingStateEnum.FINISHED]: 'finalizada',
   [BookingStateEnum.CANCELLED]: 'cancelada',
}
export const bookingStateMap = new Map<BookingStateEnum, BookingState>([
   [BookingStateEnum.PENDING, 'pendiente'],
   [BookingStateEnum.ACTIVE, 'activa'],
   [BookingStateEnum.FINISHED, 'finalizada'],
   [BookingStateEnum.CANCELLED, 'cancelada'],
])
export const sizeMap = new Map<Size, SizeRange>([
   ['s', [150, 160]],
   ['m', [161, 170]],
   ['l', [171, 180]],
   ['xl', [181, 190]],
   ['xxl', [191, 200]],
])

export const typeMap = new Map<BikeType, string>([
   ['mountain', 'montaña'],
   ['city', 'paseo'],
   ['electric', 'eléctrica'],
   ['road', 'carretera'],
])

export const rangeMap = new Map<BikeRange, string>([
   ['top', 'premium'],
   ['high', 'alta'],
   ['mid', 'media'],
   ['ride', 'paseo/trekking'],
])

const typeObject = Object.fromEntries(typeMap)

/****************************************************************EXPLICACION****************************************************/

// Firma de índices vs Record

// Definición de tipos previamente declarados
type Theme = 'LIGHT' | 'DARK'

interface ThemeSettings {
   background: string
   textColor: string
}

// Uso de la firma de índices con tipos previamente declarados
interface ThemeConfig {
   // Firma de índice: permite que las claves sean de tipo string y los valores de tipo ThemeSettings
   [key: string]: ThemeSettings
}

const themeConfig: ThemeConfig = {
   LIGHT: {
      background: '#ffffff',
      textColor: '#000000',
   },
   DARK: {
      background: '#000000',
      textColor: '#ffffff',
   },
}

console.log(themeConfig.LIGHT) // { background: '#ffffff', textColor: '#000000' }

// Ejemplo con Record

// Definición de tipos previamente declarados
type Palette = 'LIGHT' | 'DARK'

interface PaletteSettings {
   background: string
   textColor: string
}

const paletteConfig: Record<Palette, PaletteSettings> = {
   LIGHT: {
      background: '#ffffff',
      textColor: '#000000',
   },
   DARK: {
      background: '#000000',
      textColor: '#ffffff',
   },
}

console.log(paletteConfig.LIGHT) // { background: '#ffffff', textColor: '#000000' }

// Diferencias y beneficios de cada enfoque
// - Firma de Índices: Permite mayor flexibilidad si no conoces todas las claves de antemano o si las claves pueden ser dinámicas.
// - Record: Proporciona un tipado más explícito y restringido cuando las claves son conocidas y fijas.
