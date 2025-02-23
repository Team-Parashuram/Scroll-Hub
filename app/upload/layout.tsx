import Header from '@/components/Header'
import React from 'react'

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default layout
