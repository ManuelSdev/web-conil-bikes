'use client'

import { useState } from 'react'

import AppBar from './AppBar'
import ModalSidebar from './ModalSidebar'
import StaticSidebar from './StaticSidebar'
import React from 'react'

export default function DashboardShell({ children, sidebarContent }) {
   const [sidebarOpen, setSidebarOpen] = useState(false)
   return (
      <div>
         <ModalSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            sidebarContent={sidebarContent}
         />

         {/* Static sidebar for desktop */}
         <StaticSidebar sidebarContent={sidebarContent} />

         <div className="lg:pl-72">
            <AppBar setSidebarOpen={setSidebarOpen} />
            <main className="py-10">
               <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
         </div>
      </div>
   )
}