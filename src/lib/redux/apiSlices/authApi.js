import { baseApi } from './baseApi'
const urlParams = (obj) => new URLSearchParams(obj)

export const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      //https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#performing-multiple-requests-with-a-single-query

      createAccount: builder.mutation({
         query: ({ name, phone, email, password }) => ({
            url: 'auth',
            method: 'POST',

            body: { action: 'createAccount', name, phone, email, password },
         }),
      }),
      //Estos token son idToken según docu pero en el objeto que pillo en cliente se llaman accessToken
      checkCustomClaims: builder.mutation({
         query: (token) => ({
            url: 'auth',
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: { action: 'checkCustomClaims' },
         }),
      }),
      createSessionCookie: builder.mutation({
         query: (token) =>
            console.log(
               'TOKEN RECIBIDO EN authApi para el header de createSessionCookie -> ',
               token
            ) || {
               url: 'auth',
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${token}`,
               },
               body: { action: 'createSessionCookie' },
            },
      }),
      signOut: builder.mutation({
         query: (role) => ({
            url: 'auth/sessionLogout',
            method: 'POST',
            /*
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: 'arrayOfIds',
            */
            body: { cookieName: 'userSession' },
         }),
      }),
      dashboardSignOut: builder.mutation({
         query: (role) => ({
            url: 'auth/sessionLogout',
            method: 'POST',
            /*
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: 'arrayOfIds',
            */
            body: { cookieName: 'adminSession' },
         }),
      }),
   }),
})

export const {
   useCreateAccountMutation,
   useSignOutMutation,
   useDashboardSignOutMutation,
   useCreateSessionCookieMutation,
   useCheckCustomClaimsMutation,
} = authApi