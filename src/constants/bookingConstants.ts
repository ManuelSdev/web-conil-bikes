import { BookingStatusEnum, BookingStatusLabel } from '@/types/bookingTypes'

export const bookingStatusTranslation: Record<
   BookingStatusEnum,
   BookingStatusLabel
> = {
   [BookingStatusEnum.PENDING]: 'pendiente',
   [BookingStatusEnum.ACTIVE]: 'activa',
   [BookingStatusEnum.FINISHED]: 'finalizada',
   [BookingStatusEnum.CANCELLED]: 'cancelada',
}

export const bookingStatusTranslationMap = new Map<
   BookingStatusEnum,
   BookingStatusLabel
>([
   [BookingStatusEnum.PENDING, 'pendiente'],
   [BookingStatusEnum.ACTIVE, 'activa'],
   [BookingStatusEnum.FINISHED, 'finalizada'],
   [BookingStatusEnum.CANCELLED, 'cancelada'],
])
