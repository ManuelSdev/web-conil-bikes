//@ts-nocheck
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   //revisa
   images: {
      domains: [
         'www.sbbikestogo.com',
         //  'www.assets.specialized.com',
         'assets.specialized.com',
         'trek.scene7.com',
      ],
   },
   /* config options here */
   /*
   Esto debe estar habilitado en produccion
   async rewrites() {
      //https://nextjs.org/docs/api-reference/next.config.js/rewrites
      return [
         {
            source: '/__/auth/:path*',
            destination: `https://conil-bikes.firebaseapp.com/__/auth/:path*`,
         },
      ]
   },
   */
}

export default nextConfig
