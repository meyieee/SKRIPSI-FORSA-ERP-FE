import React from 'react'

type FormFieldProps = {
  label: string
  name: string
  value: string | number
  onChange: (value: string) => void
  type?: 'text' | 'date' | 'datetime-local' | 'time' | 'number' | 'email'
  placeholder?: string
  required?: boolean
  readOnly?: boolean
  className?: string
  min?: string | number
  max?: string | number
  step?: string | number
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  readOnly = false,
  className = '',
  min,
  max,
  step,
}: FormFieldProps) {
  return (
    <div className={`mb-2 ${className}`}>
      <label className={`form-label ${required ? 'required' : ''}`}>{label}</label>
      <input
        type={type}
        name={name}
        className='form-control'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

