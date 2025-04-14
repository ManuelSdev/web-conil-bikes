// @ts-nocheck
import React from 'react'
import RentImage from '@/public/images/home/rent.webp'
import ShopImage from '@/public/images/home/shop.jpg'
import RepairImage from '@/public/images/home/repair.jpg'
import ImageCard from '@/components/ImageCard'
import { headers } from 'next/headers'

import Loading from './loading'
//import { CustomLink } from '@/components/common/CustomLink'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Container from '@/components/layouts/site/Container'
import CorpName from '@/components/svg/CorpName'

const cards = [
   {
      src: RentImage,
      label: (
         <span>
            ALQUILER DE <br /> BICICLETAS
         </span>
      ),
      //  title: 'Alquiler de bicicletas',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum vitae ipsum eget tempus. Phasellus interdum id massa non bibendum. Curabitur auctor cursus dignissim.',
      renderButton: (props) => (
         <Button {...props} asChild>
            {/*<CustomLink href="/booking/date">RESERVAR ONLINE</CustomLink>*/}
            <Link href="/booking/date" className="hidden">
               RESERVAR ONLINE
            </Link>
         </Button>
      ),
   },
   {
      src: ShopImage,
      label: (
         <span>
            VENTA DE
            <br />
            BICICLETAS Y<br /> ACCESORIOS
         </span>
      ),
      // title: 'Venta de bicicletas y accesorios',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum vitae ipsum eget tempus. Phasellus interdum id massa non bibendum. Curabitur auctor cursus dignissim.',
      renderButton: (props) => <Button {...props}>VER CATALOGO</Button>,
   },
   {
      src: RepairImage,
      label: (
         <span>
            {' '}
            REPARACION Y
            <br />
            MANTENIMIENTO
         </span>
      ),
      //   title: 'Reparación y mantenimiento',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum vitae ipsum eget tempus. Phasellus interdum id massa non bibendum. Curabitur auctor cursus dignissim.',
      renderButton: (props) => <Button {...props}>CONTACTAR</Button>,
   },
]

export default async function HomePage() {
   //TODO: ajusta responsive
   //TODO: que es esto de referer?
   // const headersList = headers()****************************************
   //const referer = headersList.get('referer')
   //console.log('referer ->', referer)
   // const res = await getAppBikesConfig()
   //const appBikesConfig = await res.json()
   ////console.log('params IN HOME PAGE@-> ', appBikesConfig)

   return (
      //TODO: he quitado bg-fixed del primer div para evitar movimiento al sacar el drawer

      <main>
         {/* <Loading loaded={true} />*/}
         <div className="h-slimBarScreen md:h-fatBarScreen w-full bg-[url(/images/home/main.jpg)] bg-cover bg-fixed bg-[70%] bg-no-repeat min-[900px]:bg-center">
            {/* <TestClientFireAuth />*/}
            <div className="flex h-full items-center justify-center backdrop-brightness-75">
               <CorpName
                  className={
                     'h-[calc(100vh-64px)] w-full max-w-[1000px] fill-[#D5FF40] stroke-white'
                  }
                  viewBox={'0 0 654 97'}
               />
            </div>
         </div>
         <div className="bg-dark-400">
            <Container>
               {/*     <Trasa />*/}

               <div className="HomePage px-8 lg:px-8">
                  <div className="grid auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                     {cards.map((card, idx) => (
                        <ImageCard key={idx} {...card} />
                     ))}
                  </div>
               </div>
            </Container>
         </div>
      </main>
   )
}
