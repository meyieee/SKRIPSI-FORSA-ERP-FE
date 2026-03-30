import { atom, useAtom } from 'jotai'
import type { CashRequestForm } from '../core/cash-request'

const formAtom = atom<CashRequestForm | null>(null)
const submittingAtom = atom(false)
const errorsAtom = atom<string[]>([])

export function useCashAtoms() {
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
