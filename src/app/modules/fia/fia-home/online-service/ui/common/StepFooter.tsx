import React from 'react'

type Props = {
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  onSave?: () => void
  onSubmit?: () => void
  submitting?: boolean
}

export function StepFooter({ canPrev, canNext, onPrev, onNext, onSave, onSubmit, submitting }: Props) {
  return (
    <div className='d-flex justify-content-between mt-6'>
      <div>
        <button className='btn btn-light' disabled={!canPrev || !!submitting} onClick={onPrev}>Back</button>
      </div>
      <div className='d-flex gap-2'>
        {onSave && <button className='btn btn-primary' disabled={!!submitting} onClick={onSave}>Save</button>}
        {canNext && <button className='btn btn-primary' disabled={!canNext || !!submitting} onClick={onNext}>Next</button>}
        {!canNext && onSubmit && (
          <button className='btn btn-success' disabled={!!submitting} onClick={onSubmit}>Submit</button>
        )}
      </div>
    </div>
  )
}


