export type BikeSize = 'S' | 'M' | 'L' | 'XL' | 'XXL'
export type BikeSizeRange = [number, number]
export type BikeType = 'mountain' | 'city' | 'electric' | 'road'
export type BikeTypeLabel = 'Montaña' | 'Paseo' | 'Eléctrica' | 'Carretera'
export type BikeRange = 'top' | 'high' | 'mid' | 'ride'
export type BikeRangeLabel = 'Premium' | 'Alta' | 'Media' | 'Paseo/Trekking'

export interface BikeSegment {
   modelType: BikeType
   modelRange: BikeRange
   segmentPrice: number
}

//Firma de índices vs Record
