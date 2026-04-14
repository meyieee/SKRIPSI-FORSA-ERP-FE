import {useEffect, useMemo, useState} from 'react'
import {
  fetchDepartmentOptions,
  fetchSectionOptions,
} from '../../../online-service/core/employee-search/_hrMasterOptions'

type Option = {
  value: string
  label: string
}

type SectionOption = Option & {
  departmentCode: string
}

export function useFeedsFilterOptions(departmentCode?: string) {
  const [departmentOptions, setDepartmentOptions] = useState<Option[]>([])
  const [sectionOptions, setSectionOptions] = useState<SectionOption[]>([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const [departments, sections] = await Promise.all([
          fetchDepartmentOptions(),
          fetchSectionOptions(),
        ])

        if (cancelled) return
        setDepartmentOptions(departments)
        setSectionOptions(sections)
      } catch (error) {
        if (cancelled) return
        console.error('useFeedsFilterOptions', error)
        setDepartmentOptions([])
        setSectionOptions([])
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredSectionOptions = useMemo(() => {
    const dept = String(departmentCode || '').trim()
    if (!dept) {
      return sectionOptions.map(({value, label}) => ({value, label}))
    }

    return sectionOptions
      .filter((item) => item.departmentCode === dept)
      .map(({value, label}) => ({value, label}))
  }, [departmentCode, sectionOptions])

  return {
    departmentOptions,
    sectionOptions: filteredSectionOptions,
  }
}
