import React from 'react'

type Option = {
  value: string
  label: string
}

type FormSelectProps = {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  required?: boolean
  className?: string
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = '[combo]',
  required = false,
  className = '',
}: FormSelectProps) {
  return (
    <div className={`mb-2 ${className}`}>
      <label className={`form-label ${required ? 'required' : ''}`}>{label}</label>
      <select
        name={name}
        className='form-select'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

