// @ts-nocheck
import { baseApi } from './baseApi'
const urlParams = (obj) => new URLSearchParams(obj)

export const cookieApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      createCookie: builder.query({
         query: ({ name, value }) => ({
            url: `/cookies?name=${name}&value=${value}`,
         }),
      }),
      deleteCookie: builder.query({
         query: (name) => ({
            url: `/cookies?name=${name}&value=${''}&maxAge=0`,
         }),
      }),
   }),
})

export const {
   useCreateCookieQuery,
   useLazyCreateCookieQuery,
   useDeleteCookieQuery,
   useLazyDeleteCookieQuery,
} = cookieApi
