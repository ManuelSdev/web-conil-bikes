//@ts-nocheck
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   /* config options here */
   /*
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
