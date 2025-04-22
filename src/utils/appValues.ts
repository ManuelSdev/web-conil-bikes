type State = 'pending' | 'active' | 'finished' | 'cancelled'

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

//console.log(themeConfig.LIGHT) // { background: '#ffffff', textColor: '#000000' }

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

//console.log(paletteConfig.LIGHT) // { background: '#ffffff', textColor: '#000000' }

// Diferencias y beneficios de cada enfoque
// - Firma de Índices: Permite mayor flexibilidad si no conoces todas las claves de antemano o si las claves pueden ser dinámicas.
// - Record: Proporciona un tipado más explícito y restringido cuando las claves son conocidas y fijas.
