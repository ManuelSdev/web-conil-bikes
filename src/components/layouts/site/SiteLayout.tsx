// @ts-nocheck
// @ts-nocheck
import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Container from './Container'

export default function SiteLayout(props) {
   return (
      <div className="min-h-full">
         <NavBar />
         {/* <div className="h-slimTopAppBar w-full md:h-fatTopAppBar" />*/}
         <div className="bg-dark-400">
            <Container {...props} />
         </div>

         <Footer />
      </div>
   )
}
