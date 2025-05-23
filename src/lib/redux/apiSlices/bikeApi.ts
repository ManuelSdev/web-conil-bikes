// @ts-nocheck
import { baseApi } from './baseApi'

const urlParams = (obj) => new URLSearchParams(obj)

export const bikeApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getAppBikesConfig: builder.query({
         query: () => 'bikes/appConfig',
      }),
      getBikes: builder.query({
         query: (filters) => BIKES + `?${filters}`,
      }),

      getBikesById: builder.query({
         query: (arrayOfIds) => ({
            url: BIKES,
            method: 'POST',

            body: arrayOfIds,
         }),
      }),

      getAvailableSizes: builder.query({
         query: ({ dateRange }) =>
            //  console.log('dateRange QUERY --> ', dateRange) ||
            `bikes/available/${dateRange}`,
         transformResponse: (response, meta, arg) => {
            return response.data.availableSizes
         },
      }),

      getAvailableTypes: builder.query({
         query: ({ dateRange, size }) => `bikes/available/${dateRange}/${size}`,
         transformResponse: (response, meta, arg) => {
            return response.data.availableTypes
         },
      }),
      /* Uso mutation para usar el reset de la cache
      getAvailableRanges: builder.query({
         query: ({ dateRange, size, type }) =>
            `bikes/available/${dateRange}/${size}/${type}`,
         invalidatesTags: ['BikeRanges'],
      }),
      */
      getAvailableRanges: builder.mutation({
         query: ({ dateRange, size, type }) => ({
            url: `bikes/available/${dateRange}/${size}/${type}`,
            method: 'GET', // Especificamos el método GET
         }),
         transformResponse: (response, meta, arg) => {
            return response.data.availableRanges
         },
         invalidatesTags: ['BikeRanges'], // Mantén las tags si necesitas invalidar el caché
      }),
      getAvailableStock: builder.query({
         query: ({ from, to }) => AV_STOCK + `?${urlParams({ from, to })}`,
      }),
      getAvailableBikes: builder.query({
         query: ({ dateRange, size, type, range }) =>
            `bikes/available/${dateRange}/${size}/${type}/${range}`,

         transformResponse: (response, meta, arg) => {
            const res = response
            const { status } = meta.response
            // //console.log('@@@@@@@@@@@@@@ transformRes res _> ', res)
            // //console.log('@@@@@@@@@@@@@@ transformRes status _> ', status)

            return response.data.availableBikes
         },
      }),

      getReservedBikeAvailabilityInRange___: builder.query({
         query: ({ from, to, reservedBikes, bookingId }) =>
            AVY_RESERVED_BIKES +
            `?${urlParams({ from, to, reservedBikes, bookingId })}`,
      }),

      getReservedBikeAvailabilityInRange: builder.query({
         query: ({ from, to, reservedBikes, bookingId }) => ({
            url: AVY_RESERVED_BIKES,
            method: 'POST',

            body: { from, to, reservedBikes, bookingId },
         }),
      }),
   }),
})
//const [trigger, result, lastPromiseInfo] = baseApi.endpoints.getSizes.useLazyQuery()

export const useGetAvailableBikesQueryState =
   bikeApi.endpoints.getAvailableBikes.useQueryState

export const {
   useGetAppBikesConfigQuery,
   useGetBikesQuery,
   useGetBikesByIdQuery,
   useGetAvailableStockQuery,
   useGetAvailableSizesQuery,
   useGetAvailableTypesQuery,
   useLazyGetAvailableTypesQuery,
   //useLazyGetAvailableRangesQuery,
   useGetAvailableRangesQuery,
   useGetAvailableRangesMutation,
   useGetAvailableBikesQuery,
   useLazyGetAvailableBikesQuery,
   useGetReservedBikeAvailabilityInRangeQuery,
   useLazyGetReservedBikeAvailabilityInRangeQuery,
} = bikeApi
