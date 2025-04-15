// @ts-nocheck
import React from 'react'
import {
   useGetMatchingUsersQuery,
   useGetUserByIdentifierQuery,
} from '@/lib/redux/apiSlices/userApi'
export default function useMatchingUsers({ phone, email }) {
   const {
      data: users,
      isLoading,
      isSuccess,
      refetch,
      isFetching,
      originalArgs,
   } = useGetMatchingUsersQuery(
      { phone, email },
      {
         skip: !(phone || email),
         // refetchOnMountOrArgChange: true
      }
   )
   console.log('data -> ', users)

   const getAlerts = () => {
      // const userWithEmailAlert = users.filter((user) => user.email === email)
      const emailAlert = users.map((user) => user.email === email && user.email)
      // const userWithPhoneAlert = users.filter((user) => user.phone === phone)
      const phoneAlert = users.map((user) => user.phone === phone && user.phone)
      return { emailAlert, phoneAlert }
   }

   const alerts = users ? getAlerts() : null

   const checkedUsers = alerts
      ? users.map((user) => {
           if (user.email === email && user.phone === phone) {
              return { ...user, emailAlert: true, phoneAlert: true }
           }

           if (user.email === email) {
              return { ...user, emailAlert: true }
           }
           if (user.phone === phone) {
              return { ...user, phoneAlert: true }
           }
        })
      : users
   return {
      users,
      isLoading,
      isSuccess,
      refetch,
      isFetching,
      originalArgs,
      alerts,
      checkedUsers,
   }
}
