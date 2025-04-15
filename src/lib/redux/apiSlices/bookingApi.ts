// @ts-nocheck
import { baseApi } from './baseApi'
const urlParams = (obj) => new URLSearchParams(obj)

export const bookingApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getBooking_: builder.query({
         query: ({ id, ...filters }) =>
            console.log(BOOKINGSS(id, filters)) ||
            // BOOKINGS + `?${urlParams({ id })}`
            BOOKINGSS(id, filters),
         /*
         transformResponse: (response, meta, arg) => {
            const res = response
            const { status } = meta.response
            console.log('@@@@@@@@@@@@@@ transformRes res _> ', res)
            console.log('@@@@@@@@@@@@@@ transformRes status _> ', status)

            return res
         },
         */
         providesTags: ['Booking'],
      }),
      getBooking: builder.query({
         query: ({ bookingId }) => `bookings/${bookingId}`,
         /*
         transformResponse: (response, meta, arg) => {
            const res = response
            const { status } = meta.response
            console.log('@@@@@@@@@@@@@@ transformRes res _> ', res)
            console.log('@@@@@@@@@@@@@@ transformRes status _> ', status)

            return res
         },
         */
         //    providesTags: ['Booking'],
      }),
      /*
      getBookingsOnDateXX: builder.query({
         query: (date) => BOOKINGS_ON_DATE + `?date=${date}`,
         providesTags: ['Booking'],
      }),
      */
      getBookingsOnDate: builder.query({
         query: ({ date }) => BOOKINGS_ON_DATE + `?${urlParams({ date })}`,
         providesTags: ['Booking'],
      }),
      getBookingDatesInRange: builder.query({
         query: ({ from, to }) => `/bookings?${urlParams({ from, to })}`,
         // providesTags: ['User'],
      }),
      getBookingBikes: builder.query({
         query: ({ bookingId }) =>
            `/bookings/${urlParams({ bookingId })}/bikes`,
         // providesTags: ['User'],
      }),
      createBooking: builder.mutation({
         query: (data) => ({
            url: '/bookings',
            method: 'POST',
            /*
                headers: {
                    //'Accept': 'application/json',
                    "Content-type": "application/json; charset=UTF-8"
                },
                */
            body: data,
         }),
         // invalidatesTags: ['Orders'],
      }),
      updateBooking: builder.mutation({
         query: ({ bookingId, data }) => ({
            url: `bookings/${bookingId}`,
            method: 'PATCH',
            /*
                headers: {
                    //'Accept': 'application/json',
                    "Content-type": "application/json; charset=UTF-8"
                },
                */
            body: data,
         }),
         invalidatesTags: ['Booking'],
      }),
   }),
})

export const {
   useGetBookingQuery,
   useLazyGetBookingQuery,
   useGetBookingBikesQuery,
   useLazyGetBookingBikesQuery,
   useGetBookingDatesInRangeQuery,
   useLazyGetBookingDatesInRangeQuery,
   useGetBookingsOnDateQuery,
   useLazyGetBookingsOnDateQuery,
   useCreateBookingMutation,

   useUpdateBookingMutation,
} = bookingApi
