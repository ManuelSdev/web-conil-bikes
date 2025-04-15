// @ts-nocheck
'use client'
import React from 'react'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { es } from 'date-fns/locale'
import clsx from 'clsx'

export default function CustomCalendar({ ...props }) {
   const classNames = {
      root: 'flex max-w-xl flex-col items-stretch',
      //root: 'max-w-fit',
      month: 'space-y-4',
      caption: 'flex justify-between pt-1 relative items-center px-2',
      caption_label: 'text-xl font-medium',
      nav: 'flex space-x-2',
      head_row: 'flex pb-4',
      head_cell: 'rounded-md w-9 font-normal m-[0.15rem]',
      row: 'flex w-full ',
      cell: 'text-center text-sm p-0 relative ring-0  rounded-full focus-within:relative focus-within:z-20 m-[0.15rem]',

      day: clsx(
         'h-9 w-9 p-0 font-normal hover:bg-stone-100 aria-selected:opacity-100',
         'aria-selected:bg-blue-600  aria-selected:text-white aria-selected:hover:bg-blue-800'
      ),
      day_today: 'ring-2 ring-amber-400',
      button_reset: 'button_reset', //sin esto no cambia botones
      button: 'rounded-full',
   }
   return (
      <DayPicker
         className="max-w-fit"
         classNames={classNames}
         //disabled={{ before: new Date() }}
         /*
         modifiersClassNames={{
            selected: 'my-selected',
            day: 'ring-2 ring-amber-400',
         }}
         */
         {...props}
      />
   )
}

const allClassNames = {
   //Agunos elementos comparten clases, como es div principal: class="month caption_start caption_end"
   // button: 'button', // Los botones.
   button_reset: 'button_reset', // El estilo para restablecer los botones.   ???
   caption: 'caption', // La leyenda (muestra el encabezado del calendario y la navegación).
   caption_between: 'caption_between', // La leyenda cuando está entre dos meses (cuando multipleMonths > 2).
   caption_dropdowns: 'caption_dropdowns', // El contenedor de los menús desplegables.
   caption_end: 'caption_end', // La leyenda cuando está al final de una serie de meses.
   caption_label: 'caption_label', // La etiqueta de la leyenda.
   caption_start: 'caption_start', // La leyenda cuando está al principio de una serie de meses.
   cell: 'cell', // La celda de la tabla que contiene el elemento del día.
   day: 'day', // El elemento del día: es un span cuando no es interactivo, un botón en caso contrario.
   day_disabled: 'day_disabled ', // El día cuando está deshabilitado.
   day_hidden: 'day_hidden', // El día cuando está oculto.
   day_outside: 'day_outside ', // El día cuando está fuera del mes.
   day_range_end: 'day_range_end', // El día cuando está al final de un rango seleccionado.
   day_range_middle: 'day_range_middle', // El día en el medio de un rango seleccionado: no incluye los días "desde" y "hasta".
   day_range_start: 'day_range_start', // El día cuando está al principio de un rango seleccionado.
   day_selected: 'day_selected', // El día cuando está seleccionado.
   day_today: 'day_today', // El día de hoy.
   dropdown: 'dropdown', // El elemento de menú desplegable (select).
   dropdown_icon: 'dropdown_icon', // El icono del menú desplegable.
   dropdown_month: 'dropdown_month', // El menú desplegable para cambiar el mes.
   dropdown_year: 'dropdown_year', // El menú desplegable para cambiar el año.
   head: 'head', // La cabecera de la tabla.
   head_cell: 'head_cell', // La celda de la cabecera.
   head_row: 'head_row', // La fila de la cabecera.
   month: 'month', // El contenedor de la tabla.
   months: 'months', // El contenedor de los meses.
   multiple_months: 'multiple_months', // El elemento raíz cuando numberOfMonths > 1.
   nav: 'nav', // El contenedor de la navegación.
   nav_button: 'nav_button', // El botón de navegación.
   nav_button_next: 'nav_button_next', // El botón de navegación "mes siguiente".
   nav_button_previous: 'nav_button_previous', // El botón de navegación "mes anterior".
   nav_icon: 'nav_icon', // El icono del botón de navegación.
   root: 'root', // El elemento raíz.
   row: 'row', // La fila de la tabla.
   table: 'table', // La tabla que contiene el calendario mensual.
   tbody: 'tbody', // El cuerpo de la tabla.
   tfoot: 'foot', // El pie de la tabla.
   vhidden: 'vhidden', // El estilo de un elemento visualmente oculto.
   weeknumber: 'weeknumber', // El número de la semana que se muestra en la columna.
   with_weeknumber: 'with_weeknumber', // El elemento raíz cuando showWeekNumber={true}.
}
const shadcnClassNames = {
   //root: 'flex max-w-xl flex-col items-center',
   //months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
   month: 'space-y-4',
   //caption: 'flex justify-center pt-1 relative items-center',
   //caption_label: 'text-sm font-medium',
   //nav: 'space-x-1 flex items-center',
   //nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
   //  nav_button_previous: 'absolute left-1',
   // nav_button_next: 'absolute right-1',
   //table: 'w-full border-collapse space-y-1',
   // head_row: 'flex pb-4',
   // head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
   // row: 'flex w-full mt-2',
   //  cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
   //day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
   //day_selected:'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
   // day_today: 'bg-accent text-accent-foreground ',
   // day_outside: 'text-muted-foreground opacity-50',
   //day_disabled: 'text-muted-foreground opacity-50 bg-red-600',
   //day_range_middle:      'aria-selected:bg-accent aria-selected:text-accent-foreground',
   //day_hidden: 'invisible',
   button: 'rounded-full',
}
// aria gridCell / button / gridContent
// shad cell / button
const twStyles = {
   className: 'text-left m-[0.2rem] bg-black top-1',
}
const className = clsx(
   'top-1 m-[0.2rem] bg-black text-left',
   'bg-blue-700 text-gray-100'
)
//console.log(className)
const ariaClassNames = {
   root: 'flex max-w-xl flex-col items-center',
   month: 'space-y-4',
   caption: 'flex justify-between pt-1 relative items-center px-2',
   caption_label: 'text-xl font-medium',
   nav: 'flex space-x-2',
   head_row: 'flex pb-4',
   head_cell: 'rounded-md w-9 font-normal m-[0.15rem]',
   row: 'flex w-full ',
   cell: 'text-center text-sm p-0 relative ring-0  rounded-full focus-within:relative focus-within:z-20 m-[0.15rem]',

   day: clsx(
      'h-9 w-9 p-0 font-normal hover:bg-stone-100 aria-selected:opacity-100',
      'aria-selected:bg-blue-600  aria-selected:text-white aria-selected:hover:bg-blue-800'
   ),
   day_today: 'ring-2 ring-amber-400',
   button_reset: 'button_reset',
   button: 'rounded-full',
}
const aStyles = clsx(
   'h-9 w-9 bg-blue-600 p-0 font-normal text-white hover:bg-blue-800 hover:bg-stone-100 aria-selected:opacity-100'
)

/**
 *
 * @param {Array.<Object.<string, string>>} arr - Array de objetos cuyas propiedades son lo elementos estilizables de react-day-picker y cuyos valores son las clases que le asignas a cada elemento
 *  Este param equivale al typescript: arr: Array<{ [key: string]: string }> -> array de objetos cuyas propiedades son strings y cuyos valores son strings
 * @returns {Object.<string, string>} - un objeto que combina y concatena las propiedades de los objetos de entrada
 */
function mergeAndConcatClassNamesObjects(arr) {
   const result = {} // Inicializa un objeto vacío que se utilizará para almacenar las propiedades combinadas de los objetos de entrada.

   for (const obj of arr) {
      // Itera sobre cada objeto en el array `arr`.
      for (const key in obj) {
         // Itera sobre cada propiedad del objeto actual.
         if (obj.hasOwnProperty(key)) {
            // Comprueba si la propiedad es propia del objeto (y no heredada).
            if (result.hasOwnProperty(key)) {
               // Comprueba si la propiedad ya existe en el objeto `result`.
               result[key] += ' ' + obj[key] // Concatena el valor de la propiedad del objeto actual al valor de la propiedad correspondiente en el objeto `result`, con un espacio en blanco entre ellos.
            } else {
               result[key] = obj[key] // Si la propiedad no existe en el objeto `result`, copia la propiedad en el objeto `result`.
            }
         }
      }
   }

   // @ts-ignore
   return result // Devuelve el objeto `result` que contiene las propiedades combinadas de los objetos de entrada.
}

const mergedClassNames = mergeAndConcatClassNamesObjects([
   // allClassNames,
   // shadcnClassNames,
   ariaClassNames,
])
/**
 * ////////////////////////////////////// FUNCIONAMIENTO //////////////////////////////////////
 * Es lo mismo aplicar aria-selected a day que tocar directamente sobre day_today
 * Hago lo primero porque no se superponen los estilos:
 *    Si miras el inspector de google, button/day está contenido en cell. <button class="button..." tiene una
 *    serie de clases aplicada. Si pico y selecciono un día, a ese  class de button se le añade una clase y queda así
 *   <button class="button...day_selected" . (suponiendo que no hayas dado valores concretos a day_selected)
 * ENTONCES: El comportamiento anterior es automatico, no va en funcion de mergeAndConcatClassNamesObjects().
 *    Si defino day_selected: 'hola', dentro de ariaClassNames , la función mergeAndConcatClassNamesObjects()
 *    ahora sí actua y dejaría esto class="button...day_selected hola"
 * ENTONCES: Picar un día solo hace que al tag button le metan la clase day_selected y lo que tengas definidio dentro
 *    Si en day tengo un hover:algo y en day_selected tengo un hover:otro, la prioridad la marca tailwind y puede ser que
 *    se aplique el hover de day, a pesar de estar seleccionado el dia. Esto se puede corregir facil con twMerge/clsx/mergeClass(),
 *    que aplicaría la última clase en caso de conflicto, pero quiero evitar los calculos de twMerge siempre que pueda
 * EN CAMBIO: si en lugar de tocar day_select, tocas day usando aria-selected, ahí no hay conflicto entre el hover:algo y el aria-selected:hover:otro
 * CLAVE: no todos los elementos llevan aria, pero de momento lo hago así hasta que esté obligado a twMerge
 */
/**
 * Modificadores: están los internos (ej selected) y los custom que metes con la prop modifier
 * https://react-day-picker.js.org/api/enums/InternalModifier
 * Ambos se estilan con modifiersClassNames
 *
 */
/**
 * prop className: tienes esta lista de elementos estilizables
 * https://react-day-picker.js.org/api/types/StyledElement#type-declaration
 * classNames{{ alias_de_elemento: clase_que_le_pones}}
 * Revisa aquí
 * https://ui.shadcn.com/docs/components/calendar#installation
 * En la parte de instalation/manual/expand, algunas clases que tienen
 * subclases, como nav_buton que usa cn (algo como tw merge?)
 *
 */

/**
 * prop components: sobreescribe componentes. Los componentes modificables están en customComponents
 * https://react-day-picker.js.org/api/interfaces/CustomComponents
 * ej: https://ui.shadcn.com/docs/components/calendar#installation
 */

/**
 * modulo npm cva: class-variance-authority
 * https://cva.style/docs
 * Creo que crea variantes con diferentes estilos de un mismo componente
 * La app de /models/shadcn-ui lo usa en el component button.tsx
 * Esto permite colarle al tag html del emento un atributo con la variant
 * y así poder seleccionarla , parecido a mui
      nav_button: cn(
         buttonVariants({ variant: 'outline' }),
         'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
      ),
 *
 */
