import React from 'react'

type Props = {
  steps: string[]
  current: number
  onStep: (idx: number) => void
}

export function AtomicStepper({ steps, current, onStep }: Props) {
  return (
    <div className='d-flex flex-wrap gap-3 align-items-center mb-6'>
      {steps.map((s, i) => (
        <button
          key={s}
          type='button'
          className={`btn btn-sm ${i === current ? 'btn-primary' : 'btn-light-primary'}`}
          onClick={() => onStep(i)}
        >
          {i + 1}. {s}
        </button>
      ))}
    </div>
  )
}


