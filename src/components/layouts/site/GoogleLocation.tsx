//@ts-nocheck
import React from 'react'
import { Suspense } from 'react'

const GoogleLocation = (props) => {
   return (
      <div {...props}>
         <Suspense fallback={<p>Loading feed...</p>}>
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1608.1353799835672!2d-6.092829890549171!3d36.28147967345775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c38200843b155%3A0x876d9ab01f65605e!2sConil%20Bikes%20-%20Conil%20Rent!5e0!3m2!1ses!2ses!4v1692603593989!5m2!1ses!2ses"
               width="100%"
               height="300"
               //  style="border:0;"

               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               allowFullScreen=""
            />
         </Suspense>
      </div>
   )
}

export default GoogleLocation
