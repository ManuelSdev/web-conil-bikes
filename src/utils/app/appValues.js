//APP CONST
export const START = 'start'
export const END = 'end'
export const HOME = 'home'
export const STORE = 'store'
export const DONE = 'done'

export const PENDING = 'pending'
export const ACTIVE = 'active'
export const FINISHED = 'finished'
export const CANCELLED = 'cancelled'
//actions
export const UPDATE = 'update'

//APP LISTS
export const sizesList = [
   ['s', [150, 160]],
   ['m', [161, 170]],
   ['l', [171, 180]],
   ['xl', [181, 190]],
   ['xxl', [191, 200]],
]
export const sizesList____ = ['s', 'm', 'l', 'xl', 'xxl']

export const typesList = [
   ['mountain', 'montaña'],
   ['city', 'paseo'],
   ['electric', 'eléctrica'],
   ['road', 'carretera'],
]

export const rangesList = [
   ['top', 'premium'],
   ['high', 'alta'],
   ['mid', 'media'],
   ['ride', 'paseo/trekking'],
]

//APP MAPS
export const BIKE_SIZES_MAP = {
   s: [150, 160],
   m: [161, 170],
   l: [171, 180],
   xl: [181, 190],
   xxl: [191, 200],
}
export const BIKE_TYPES_MAP = {
   mountain: 'montaña',
   city: 'paseo',
   electric: 'eléctrica',
   road: 'carretera',
}

export const BIKE_RANGES_MAP = {
   top: 'premium',
   high: 'alta',
   mid: 'media',
   ride: 'paseo-trekking',
}

export const BOOKING_STATES_MAP = {
   pending: 'pendiente',
   active: 'activa',
   finished: 'finalizada',
   cancelled: 'cancelada',
}

export const BOOKING_OPS_MAP = {
   pending: 'entrega',
   active: 'recogida',
}
export const BIKE_STATES_MAP = {
   inUse: 'en uso',
   inRepair: 'en reparación',
   available: 'disponible',
}

export const EVENTS_MAP = {
   start_booking: 'Empiezan',
}

export const varNameToString = (variable) => Object.keys({ variable }[0])

//APP COLORS
export const bookingDayColors = {
   startDay: '#60C5F1',
   endDay: '#C785C8',
   startEndDay: 'linear-gradient(90deg, #60C5F1 50%, #C785C8 50%)',
}

//SITE LAYOUT
export const HEADER_MOBILE_HEIGHT = 66
export const HEADER_DESKTOP_HEIGHT = 100
export const SITE_LAYOUT_PADDING_TOP = 5
export const LAYOUT_MAIN_EXTRA_PADDING_TOP = 5
export const FOOTER_DESKTOP_HEIGHT = 288
export const BOTTOM_APP_VAR_MIN_HEIGHT_XS = 56
export const BOTTOM_APP_VAR_MIN_HEIGHT_MD = 64
//export const MAIN_MIN_HEIGHT = 0
//export const FOOTER_MIN_HEIGHT = 0
