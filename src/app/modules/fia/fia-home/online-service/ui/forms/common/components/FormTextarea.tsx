import React from 'react'

type FormTextareaProps = {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
  required?: boolean
  readOnly?: boolean
  className?: string
}

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder,
  required = false,
  readOnly = false,
  className = '',
}: FormTextareaProps) {
  return (
    <div className={`mb-2 ${className}`}>
      <label className={`form-label ${required ? 'required' : ''}`}>{label}</label>
      <textarea
        name={name}
        className='form-control'
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  )
}

