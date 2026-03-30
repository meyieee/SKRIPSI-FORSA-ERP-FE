import { atom, useAtom } from 'jotai'
import type { WorkforceRequestForm } from '../core/workforce-request'

const currentStepAtom = atom(0)
const stepsAtom = atom<string[]>([
  'Request Info',
  'Workforce Specifications',
  'Job Requirements',
  'Approvals',
  'Review',
])
const formAtom = atom<WorkforceRequestForm | null>(null)
const submittingAtom = atom(false)
const errorsAtom = atom<string[]>([])

export function useWorkforceAtoms() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom)
  const [steps] = useAtom(stepsAtom)
  const [form, setForm] = useAtom(formAtom)
  const [submitting, setSubmitting] = useAtom(submittingAtom)
  const [errors, setErrors] = useAtom(errorsAtom)

  return {
    currentStep,
    setCurrentStep,
    steps,
    form,
    setForm,
    submitting,
    setSubmitting,
    errors,
    setErrors,
  }
}


