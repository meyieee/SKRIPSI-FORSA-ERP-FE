import React from 'react'
import FormField from './FormField'

type Props = {
  orgReadOnly: boolean
  displayValue: string
  label: string
  name: string
  manual: React.ReactNode
}

/** When Request For sync locks org fields, show read-only label; otherwise render manual control (FormSelect / FormField). */
export default function OrgLockedOrManualField({
  orgReadOnly,
  displayValue,
  label,
  name,
  manual,
}: Props) {
  if (orgReadOnly) {
    return (
      <FormField
        label={label}
        name={name}
        value={displayValue}
        onChange={() => {}}
        readOnly
      />
    )
  }
  return <>{manual}</>
}
