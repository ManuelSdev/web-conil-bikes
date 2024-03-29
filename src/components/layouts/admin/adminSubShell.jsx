import React from 'react'

const SubShellContainer = ({ children }) => (
   <div className="px-4 sm:px-6 lg:px-14">{children}</div>
)

const SubShellHeader = ({ children, title }) => (
   <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <div className="flex items-center space-x-2">{children}</div>
   </div>
)
export { SubShellContainer, SubShellHeader }
