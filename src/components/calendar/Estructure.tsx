// @ts-nocheck
// @ts-nocheck
import React from 'react'

export default function Estructure() {
   return (
      <div className="root ">
         <div className="months">
            <div className="month caption_start caption_end">
               <div className="caption">
                  <div
                     className="caption_label"
                     aria-live="polite"
                     role="presentation"
                     id="react-day-picker-11"
                  >
                     octubre 2023
                  </div>
                  <div className="nav">
                     <button
                        name="previous-month"
                        aria-label="Go to previous month"
                        className="button_reset button nav_button nav_button_previous"
                        type="button"
                     >
                        <svg
                           width="16px"
                           height="16px"
                           viewBox="0 0 120 120"
                           className="nav_icon"
                        >
                           <path
                              d="M69.490332,3.34314575 C72.6145263,0.218951416 77.6798462,0.218951416 80.8040405,3.34314575 C83.8617626,6.40086786 83.9268205,11.3179931 80.9992143,14.4548388 L80.8040405,14.6568542 L35.461,60 L80.8040405,105.343146 C83.8617626,108.400868 83.9268205,113.317993 80.9992143,116.454839 L80.8040405,116.656854 C77.7463184,119.714576 72.8291931,119.779634 69.6923475,116.852028 L69.490332,116.656854 L18.490332,65.6568542 C15.4326099,62.5991321 15.367552,57.6820069 18.2951583,54.5451612 L18.490332,54.3431458 L69.490332,3.34314575 Z"
                              fill="currentColor"
                              fill-rule="nonzero"
                           ></path>
                        </svg>
                     </button>
                     <button
                        name="next-month"
                        aria-label="Go to next month"
                        className="button_reset button nav_button nav_button_next"
                        type="button"
                     >
                        <svg
                           width="16px"
                           height="16px"
                           viewBox="0 0 120 120"
                           className="nav_icon"
                        >
                           <path
                              d="M49.8040405,3.34314575 C46.6798462,0.218951416 41.6145263,0.218951416 38.490332,3.34314575 C35.4326099,6.40086786 35.367552,11.3179931 38.2951583,14.4548388 L38.490332,14.6568542 L83.8333725,60 L38.490332,105.343146 C35.4326099,108.400868 35.367552,113.317993 38.2951583,116.454839 L38.490332,116.656854 C41.5480541,119.714576 46.4651794,119.779634 49.602025,116.852028 L49.8040405,116.656854 L100.804041,65.6568542 C103.861763,62.5991321 103.926821,57.6820069 100.999214,54.5451612 L100.804041,54.3431458 L49.8040405,3.34314575 Z"
                              fill="currentColor"
                           ></path>
                        </svg>
                     </button>
                  </div>
               </div>
               <table
                  className="table"
                  role="grid"
                  aria-labelledby="react-day-picker-11"
               >
                  <thead className="head">
                     <tr className="head_row">
                        <th
                           scope="col"
                           className="head_cell"
                           aria-label="lunes"
                        >
                           lu
                        </th>
                        <th
                           scope="col"
                           className="head_cell"
                           aria-label="martes"
                        >
                           ma
                        </th>
                        <th
                           scope="col"
                           className="head_cell"
                           aria-label="miércoles"
                        >
                           mi
                        </th>
                        <th
                           scope="col"
                           className="head_cell"
                           aria-label="jueves"
                        >
                           ju
                        </th>
                        <th
                           scope="col"
                           className="head_cell"
                           aria-label="viernes"
                        >
                           vi
                        </th>
                        <th
                           scope="col"
                           className="head_cell"
                           aria-label="sábado"
                        >
                           sá
                        </th>
                        <th
                           scope="col"
                           className="head_cell"
                           aria-label="domingo"
                        >
                           do
                        </th>
                     </tr>
                  </thead>
                  <tbody className="tbody">
                     <tr className="row">
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              1
                           </button>
                        </td>
                     </tr>
                     <tr className="row">
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              2
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              3
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              4
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              5
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day day_today bg-red-700"
                              role="gridcell"
                              tabindex="0"
                              type="button"
                           >
                              6
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              7
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              8
                           </button>
                        </td>
                     </tr>
                     <tr className="row">
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              9
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              10
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              11
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              12
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              13
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              14
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              15
                           </button>
                        </td>
                     </tr>
                     <tr className="row">
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              16
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              17
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              18
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              19
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              20
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              21
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              22
                           </button>
                        </td>
                     </tr>
                     <tr className="row">
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              23
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              24
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              25
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              26
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              27
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              28
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              29
                           </button>
                        </td>
                     </tr>
                     <tr className="row">
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              30
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <button
                              name="day"
                              className="button_reset button day"
                              role="gridcell"
                              tabindex="-1"
                              type="button"
                           >
                              31
                           </button>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                        <td className="cell" role="presentation">
                           <div role="gridcell"></div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}
