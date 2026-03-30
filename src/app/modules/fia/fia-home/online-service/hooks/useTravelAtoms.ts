import { atom, useAtom } from 'jotai'
import type { TravelRequestForm } from '../core/travel-request'

const formAtom = atom<TravelRequestForm | null>(null)
const submittingAtom = atom(false)
const errorsAtom = atom<string[]>([])

export function useTravelAtoms() {
  const [form, setForm] = useAtom(formAtom)
  const [submitting, setSubmitting] = useAtom(submittingAtom)
  const [errors, setErrors] = useAtom(errorsAtom)

  return {
    form,
    setForm,
    submitting,
    setSubmitting,
    errors,
    setErrors,
  }
}
