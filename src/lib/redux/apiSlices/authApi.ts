// @ts-nocheck
import { baseApi } from './baseApi'
const urlParams = (obj) => new URLSearchParams(obj)

export const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      /**
       * Endpoints que gestionan la propia app
       */
      createSessionCookie: builder.mutation({
         query: ({ accessToken, isAdmin }) => ({
            url: 'auth/firebaseAdmin/createSessionCookie',
            method: 'POST',
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
            body: { action: 'createSessionCookie', isAdmin },
         }),
      }),

      /**
       * Endpoints que gestionan funciones de firebase admin
       */
      createFirebaseUser: builder.query({
         query: ({ name, phone, email, password }) => ({
            url: `auth/firebaseAdmin/createUser?name=${name}&phone=${phone}&email=${email}&password=${password}`,
         }),
      }),
      firebaseAdminActions: builder.mutation({
         query: (obj) => ({
            url: 'auth/firebaseAdmin',
            method: 'POST',
            body: obj,
         }),
      }),
      /*
      createFirebaseUser: builder.mutation({
         query: ({ name, phone, email, password }) => ({
            url: 'auth/firebaseAdmin/createUser',
            method: 'POST',

            body: { name, phone, email, password },
         }),
      }),
      */
      getUserData: builder.query({
         query: ({ uid, email }) => {
            if (uid) return { url: `auth/firebaseAdmin/getUserData?uid=${uid}` }
            if (email)
               return {
                  url: `auth/firebaseAdmin/getUserData?email=${email}`,
               }
         },
      }),
      sendAuthEmail: builder.query({
         query: ({ name, email, type }) => ({
            url: `auth/firebaseAdmin/sendAuthEmail?name=${name}&email=${email}&type=${type}`,
         }),
      }),

      //https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#performing-multiple-requests-with-a-single-query
      /*
      createAccount: builder.mutation({
         query: ({ name, phone, email, password }) => ({
            url: 'auth',
            method: 'POST',

            body: { action: 'createAccount', name, phone, email, password },
         }),
      }),
      */
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
   useGetUserDataQuery,
   useLazyGetUserDataQuery,
   useLazySendAuthEmailQuery,
   useLazyCreateFirebaseUserQuery,
   useFirebaseAdminActionsMutation,
   //useCreateFirebaseUserMutation,
   useSignOutMutation,
   useDashboardSignOutMutation,
   useCreateSessionCookieMutation,
   useCheckCustomClaimsMutation,
} = authApi
