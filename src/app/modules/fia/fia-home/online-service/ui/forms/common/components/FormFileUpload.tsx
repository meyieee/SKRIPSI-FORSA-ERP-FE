import React from 'react'

type FormFileUploadProps = {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  accept?: string
  multiple?: boolean
  className?: string
}

export default function FormFileUpload({
  label,
  name,
  value,
  onChange,
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png',
  multiple = true,
  className = '',
}: FormFileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[]
    const fileNames = files.map((file) => file.name).join(', ')
    onChange(fileNames)
  }

  const handleBrowseClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = multiple
    input.accept = accept
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files || []) as File[]
      const fileNames = files.map((file) => file.name).join(', ')
      onChange(fileNames)
    }
    input.click()
  }

  return (
    <div className={`mb-2 ${className}`}>
      <label className='form-label'>{label}</label>
      <div className='d-flex gap-2'>
        <input
          type='file'
          name={name}
          className='form-control'
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
        />
        <button
          type='button'
          className='btn btn-outline-secondary btn-sm'
          onClick={handleBrowseClick}
        >
          Browse
        </button>
      </div>
      <small className='text-muted'>
        The user can upload multiple documents (e.g. PDF, Excel, Word, etc.)
      </small>
      {value && (
        <div className='mt-2'>
          <small className='text-success'>Selected files: {value}</small>
        </div>
      )}
    </div>
  )
}

