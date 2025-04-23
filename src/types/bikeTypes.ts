export type BikeSize = 's' | 'm' | 'l' | 'xl' | 'xxl'
export type BikeSizeRange = [number, number]
export type BikeType = 'mountain' | 'city' | 'electric' | 'road'
export type BikeTypeLabel = 'montaña' | 'paseo' | 'eléctrica' | 'carretera'
export type BikeRange = 'top' | 'high' | 'mid' | 'ride'
export type BikeRangeLabel = 'premium' | 'alta' | 'media' | 'paseo/trekking'

export interface BikeSegment {
   modelType: BikeType
   modelRange: BikeRange
   segmentPrice: number
}

//Firma de índices vs Record
