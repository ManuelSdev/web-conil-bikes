import '../../globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import Providers from '@/utils/react-query/providers'
import AdminDashboardLayout from '@/components/layout/AdminDashboardLayout'
import LoginShell from '@/components/login/LoginShell'

export async function generateStaticParams() {
   return [{ lang: 'es-ES' }]
}
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
}

export default function LoginLayout(props) {
   // console.log('Props /bookin/layout -> ', props)
   return (
      <html lang="es-ES" dir="ltr" className="h-full bg-red-500">
         <body className="h-full">
            <Providers>
               <LoginShell {...props} />
            </Providers>
         </body>
      </html>
   )
}