import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import SiteLayout from '@/components/layouts/site/SiteLayout'
import NavBar from '@/components/layouts/site/NavBar'
import Footer from '@/components/layouts/site/Footer'
import ReduxProviderWrapper from '@/lib/redux/ReduxProviderWrapper'
import Container from '@/components/layouts/site/Container'

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
})

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
})

export const metadata: Metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
}
//crear la interface
import { JSX, ReactNode } from 'react'

interface RootLayoutProps {
   children: ReactNode
   // Otras props opcionales...
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <ReduxProviderWrapper>
               <div className="min-h-full">
                  <NavBar />

                  {children}

                  <Footer />
               </div>
            </ReduxProviderWrapper>
         </body>
      </html>
   )
}
/*
   export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <ReduxProviderWrapper>
               <div className="min-h-full">
                  <NavBar />
                 

                  {children}

                  <Footer />
               </div>
            </ReduxProviderWrapper>
         </body>
      </html>
   )
}
*/
