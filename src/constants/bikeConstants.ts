import {
   BikeSize,
   BikeSizeRange,
   BikeType,
   BikeTypeLabel,
   BikeRange,
   BikeRangeLabel,
} from '@/types/bikeTypes'

export const bikeSizeMap = new Map<BikeSize, BikeSizeRange>([
   ['S', [150, 160]],
   ['M', [161, 170]],
   ['L', [171, 180]],
   ['XL', [181, 190]],
   ['XXL', [191, 200]],
])

export const bikeTypeTranslationMap = new Map<BikeType, BikeTypeLabel>([
   ['mountain', 'Montaña'],
   ['city', 'Paseo'],
   ['electric', 'Eléctrica'],
   ['road', 'Carretera'],
])

export const bikeRangeTranslationMap = new Map<BikeRange, BikeRangeLabel>([
   ['top', 'Premium'],
   ['high', 'Alta'],
   ['mid', 'Media'],
   ['ride', 'Paseo/Trekking'],
])
const typeObject = Object.fromEntries(bikeTypeTranslationMap)
