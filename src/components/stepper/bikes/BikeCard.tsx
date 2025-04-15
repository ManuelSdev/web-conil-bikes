// @ts-nocheck
const product = {
   name: 'Application UI Icon Pack',
   version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
   price: '$220',
   description:
      'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
   highlights: [
      '200+ SVG icons in 3 unique styles',
      'Compatible with Figma, Sketch, and Adobe XD',
      'Drawn on 24 x 24 pixel grid',
   ],
   imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg',
   imageAlt:
      'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
}

export default function BikeCard({ bike, renderSelectBikeButton }) {
   const { modelBrand, modelName, modelDesc, modelImages, avaiable } = bike
   const [src] = modelImages
   return (
      <div className="bg-[RGB(243,240,243)]">
         <div className="mx-auto px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
            {/* Product */}
            {/*<div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">*/}
            <div className="sm:grid sm:grid-cols-7 sm:grid-rows-1 sm:gap-x-8 sm:gap-y-10 xl:gap-x-16">
               {/* Product image */}
               <div className="sm:col-span-4 sm:row-end-1">
                  <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                     <img
                        src={src}
                        alt={product.imageAlt}
                        className="object-cover object-center"
                     />
                  </div>
               </div>

               {/* Product details */}
               <div className="mx-auto mt-7 max-w-2xl  sm:col-span-3 sm:row-span-2 sm:row-end-2 sm:mt-0 md:max-w-none">
                  <div className="flex flex-col-reverse">
                     <div className="">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                           {`${modelBrand} ${modelName}`}
                        </h1>

                        <h2 id="information-heading" className="sr-only">
                           Product information
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                           Version {product.version.name} (Updated{' '}
                           <time dateTime={product.version.datetime}>
                              {product.version.date}
                           </time>
                           )
                        </p>
                     </div>
                  </div>

                  <p className="mt-6 text-gray-500"> {modelDesc}</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                     {/* <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                     >
                        Pay {product.price}
                     </button>*/}
                     {renderSelectBikeButton(bike)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
