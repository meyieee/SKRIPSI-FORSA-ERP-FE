// 2. CareerDevelopmentView.tsx - Hanya wrapper tanpa tambahan UI
import React from 'react'
import {Outlet} from 'react-router-dom'

export const CareerDevelopmentView: React.FC = () => {
  return <Outlet />
}
