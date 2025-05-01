import React from 'react'

export default async function page() {
   const verifyCookieRawRes = await fetch(process.env.URL + `/api/cookies`)
   console.log('verifyCookieRawRes -> ', verifyCookieRawRes)
   const verifyCookieRes = await verifyCookieRawRes.json()
   console.log('verifyCookieRes -> ', verifyCookieRes)
   return <div className="h-screen">page</div>
}
