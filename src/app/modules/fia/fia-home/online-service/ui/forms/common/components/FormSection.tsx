import React from 'react'

type FormSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export default function FormSection({ title, children, className = '' }: FormSectionProps) {
  return (
    <div className={`form-section mb-4 ${className}`}>
      <h5 className='section-title'>{title}</h5>
      {children}
    </div>
  )
}

