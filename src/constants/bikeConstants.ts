import {
   BikeSize,
   BikeSizeRange,
   BikeType,
   BikeTypeLabel,
   BikeRange,
   BikeRangeLabel,
} from '@/types/bikeTypes'

export const bikeSizeMap = new Map<BikeSize, BikeSizeRange>([
   ['s', [150, 160]],
   ['m', [161, 170]],
   ['l', [171, 180]],
   ['xl', [181, 190]],
   ['xxl', [191, 200]],
])

export const bikeTypeTranslationMap = new Map<BikeType, BikeTypeLabel>([
   ['mountain', 'montaña'],
   ['city', 'paseo'],
   ['electric', 'eléctrica'],
   ['road', 'carretera'],
])

export const bikeRangeTranslationMap = new Map<BikeRange, BikeRangeLabel>([
   ['top', 'premium'],
   ['high', 'alta'],
   ['mid', 'media'],
   ['ride', 'paseo/trekking'],
])
const typeObject = Object.fromEntries(bikeTypeTranslationMap)
