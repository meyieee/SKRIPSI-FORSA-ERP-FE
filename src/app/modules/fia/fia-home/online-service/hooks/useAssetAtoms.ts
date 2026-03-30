import { atom, useAtom } from 'jotai'
import type { AssetRequestForm } from '../core/asset-request'

const formAtom = atom<AssetRequestForm | null>(null)
const submittingAtom = atom(false)
const errorsAtom = atom<string[]>([])

export function useAssetAtoms() {
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
