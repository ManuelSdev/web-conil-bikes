import Container from '@/components/layouts/site/Container'

import { JSX, ReactNode } from 'react'

interface RootLayoutProps {
   children: ReactNode
   // Otras props opcionales...
}

export default function Layout(props: Readonly<RootLayoutProps>): JSX.Element {
   return <Container {...props} />
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
