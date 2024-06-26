'use client'
import React from 'react'
import { NewUserForm } from './NewUserForm'
import {
   useCreateAccountMutation,
   useCreateUserMutation,
   useLazyGetMatchingUsersQuery,
} from '@/lib/redux/apiSlices/userApi'
import SpinnerRing from '@/components/common/SpinnerRing'

import { useRouter } from 'next/navigation'
import { generatePassword } from '@/utils/app/functions'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import BasicCard from '@/components/BasicCard'
import { useDispatch } from 'react-redux'
import { appIsloadingData } from '@/lib/redux/slices/appConfigSlice'

export default function NewUserFormHandler(props) {
   const dispatch = useDispatch()
   const router = useRouter()

   const [
      createUserAccountTrigger,
      { isLoading: isLoadingCreateUser, isError, isSuccess },
   ] = useCreateAccountMutation()

   const [
      getMatchingUsersTrigger,
      {
         isLoading: isLoadingMatches,
         isError: isErrorMatches,
         isSuccess: isSuccessMatches,
      },
   ] = useLazyGetMatchingUsersQuery()
   const isLoading = isLoadingCreateUser || isLoadingMatches
   dispatch(appIsloadingData(isLoading))

   async function onSubmit(data, event) {
      //console.log('data ->', data)
      //   console.log('@@@@@@@@@@@@@@@@@@@')
      ////console.log('ev ->', ev)
      event.preventDefault()
      const { name, phone, email } = data
      try {
         console.log('@@@@@@@@@@@@@@@@@@@')
         const { data } = await getMatchingUsersTrigger({
            phone,
            email,
         })
         console.log('matchingUsers data ->', data)

         if (data)
            return router.push(
               `/dashboard/users/new/matches?phone=${phone}&email=${email}&name=${name}`
            )
         const randomPassword = generatePassword()
         const createUserAccountRes = await createUserAccountTrigger({
            name,
            phone,
            email,
            password: randomPassword,
            isCreatedByAdmin: true,
         }).unwrap()
         console.log('createUserAccountRes ->', createUserAccountRes)
         handleSetDialog({
            open: true,
            title: 'La cuenta se ha creado correctamente',
            description: `Se ha enviado un correo electrónico de verificación a '${email}'. Revisa tu bandeja de entrada y recuerda que es posible que lo encuentres en la carpeta de spam o correo no deseado`,
            closeText: 'Aceptar',
            onOpenChange: (bool) => router.push('/dashboard/bookings/new/date'),
         })
      } catch (error) {
         console.log('ERROR:createAccount en SignUpFormPageHandler -> ', error)
         //'email_unq' es el nombre la restriccion/constraint de la tabla app_users que señala la unicidad del campo email
         const text =
            error.data.constraint === 'email_unq'
               ? 'Ya existe un usuario con este correo eléctronico'
               : 'Ha ocurrido un error'
         handleSetDialog({
            open: true,
            title: 'Ha ocurrido un error',
            description: text,
            closeText: 'Aceptar',
         })
         /*
         const {
            error: {
               data: { code },
            },
         } = error
     
         //const dialogMessage = signUpErrorHandler(code)
         handleSetDialog({
            open: true,
            title: 'Ha ocurrido un error',
            // description: dialogMessage,
            closeText: 'Aceptar',
         })
         */
      }
   }

   return (
      <BasicCard
         tittle="Crear usuario"
         description="Introduce los datos del nuevo usuario"
      >
         <NewUserForm onSubmit={onSubmit} {...props} />
      </BasicCard>
   )
}

//         {isLoading?<SpinnerRing/>:isSuccess?'Usuario creado correctamente':isError?'Ha ocurrido un error': <NewUserForm />}
/*
      const createUserAccountRes = await createUserAccountTrigger({
         name,
         phone,
         email,
         password,
         isCreatedByAdmin: false,
      }).unwrap()
      

      const { isError } = createUserAccountRes
     
      if (!isError) {
         handleSetDialog({
            open: true,
            title: 'La cuenta se ha creado correctamente',
            description: `Se ha enviado un correo electrónico de verificación a '${email}'. Revisa tu bandeja de entrada y recuerda que es posible que lo encuentres en la carpeta de spam o correo no deseado`,
            closeText: 'Aceptar',
            onOpenChange: (bool) => router.push('/dashboard/bookings/new/date'),
         })
      }
      if (isError) {
         const {
            error,
            error: {
               data: { code },
            },
         } = createUserAccountRes
         //console.log('ERROR:createAccount en SignUpFormPageHandler -> ', error)
         const dialogMessage = signUpErrorHandler(code)
         handleSetDialog({
            open: true,
            title: 'Ha ocurrido un error',
            description: dialogMessage,
            closeText: 'Aceptar',
         })
      }
      */
