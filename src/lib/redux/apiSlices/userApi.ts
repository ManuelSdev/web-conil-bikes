// @ts-nocheck
//import { USERS, USERS_BOOKINGS } from '../common/constants/routes'
import { baseApi } from './baseApi'
const urlParams = (obj) => new URLSearchParams(obj)

const userApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      //https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#performing-multiple-requests-with-a-single-query

      getUser: builder.query({
         query: ({ id, email }) =>
            //console.log('email en getUser -> ', email) ||
            `users?email=${email}`,
      }),
      getMatchingUsers: builder.query({
         query: ({ phone, email }) =>
            //console.log('email en getUser -> ', email) ||
            `users/matches?email=${email}&phone=${phone}`,
      }),
      getUserByIdentifier: builder.query({
         query: (identifier) =>
            //console.log('email en getUser -> ', email) ||
            `users/${identifier}`,
      }),
      /*
      getUserBooking: builder.query({
         query: (userIdentifier) => USERS_BOOKINGS(userIdentifier),
         //query: (userIdentifier) => '/users/1/bookings ',
      }),
      */
      createAccount: builder.mutation({
         query: ({
            name,
            phone,
            email,
            password,
            isCreatedByAdmin = false,
         }) => ({
            url: isCreatedByAdmin ? '/users/create/admin' : '/users/create',
            method: 'POST',
            body: { name, phone, email, password, isCreatedByAdmin },
         }),
      }),
   }),
})

export const {
   useGetUserQuery,
   useGetUserByIdentifierQuery,
   useLazyGetUserByIdentifierQuery,
   useGetMatchingUsersQuery,
   useLazyGetMatchingUsersQuery,
   useLazyGetUserQuery,
   useCreateAccountMutation,
} = userApi

/**
 * Ejemplo de uso de queryFn para lanzar dos querys
 https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#performing-multiple-requests-with-a-single-query

      getUser: builder.query({
         async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
            //get user
            //arg debe ser {id: value} o {email:value}
            // const identifier = arg.id ?? arg.email
            const { identifier } = arg
           //console.log(arg)

            const userResult = await fetchWithBQ(
               USERS + `?${urlParams({ identifier })}`
            )
            if (userResult.error) return { error: userResult.error }
            //users es un array con un solo objeto
           //console.log(userResult)
            const [user] = userResult.data
            const { email } = user

            const bookingResult = await fetchWithBQ(
               BOOKINGS_USER + `?${urlParams({ email })}`
            )
           //console.log(bookingResult)
            //todo pulir mensaje si no hay reservas (array bookings vacío)
            //queryFn debe devolver un objeto {data:value} o {error:value}
            return bookingResult.error
               ? { error: bookingResult.error }
               : bookingResult.data.length > 0
               ? { data: bookingResult.data }
               : { error: 'No hay reservas para este usuario' }
         },
      }), 

 */
