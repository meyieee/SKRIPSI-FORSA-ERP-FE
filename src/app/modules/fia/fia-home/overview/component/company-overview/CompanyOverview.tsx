import React, {useEffect, useMemo, useState} from 'react'
import {getAuth} from '../../../../../auth'
import {mockCompany as DUMMY_COMPANY, mockBranches as DUMMY_BRANCHES} from '../../core/dummyCompany'
import {CompanyOverviewData, BranchActivation} from './types'
import CompanyInfoCard from './components/CompanyInfoCard'
import CompanyActivateCard from './components/CompanyActivateCard'

// Export types for backward compatibility
export type {CompanyOverviewData, BranchActivation}

type Props = {
  companyData?: CompanyOverviewData
  branches?: BranchActivation[]
  activeBranchCode?: string
}

const useMockCompanyOverview = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [company, setCompany] = useState<CompanyOverviewData | undefined>()
  const [branches, setBranches] = useState<BranchActivation[] | undefined>()

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        // use dummy constants
        setCompany(DUMMY_COMPANY as unknown as CompanyOverviewData)
        setBranches(DUMMY_BRANCHES as unknown as BranchActivation[])
        setLoading(false)
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load mock data')
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

  return {loading, error, company, branches}
}


const CompanyOverview: React.FC<Props> = ({companyData, branches, activeBranchCode}) => {
  const {loading, error, company, branches: mockBranches} = useMockCompanyOverview()

  const sessionActiveBranch = useMemo(() => {
    try {
      const auth = getAuth()
      const u = auth?.user ?? null
      if (!u) return undefined
      const code: string | undefined =
        u['employees.branch_detail.com_type'] === 'HO' ? 'HO' : (u['employees.branch_detail.com_code'] as string | undefined)
      return code
    } catch {
      return undefined
    }
  }, [])

  const data = companyData ?? company
  const branchList = branches ?? mockBranches ?? []
  const activeCode = activeBranchCode ?? sessionActiveBranch ?? branchList.find(b => b.is_active)?.branch_code

  if (loading) {
    return (
      <div className='card'>
        <div className='card-body py-10 text-center'>Loading company overview...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='card'>
        <div className='card-body text-danger'>Error: {error}</div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className='row g-6'>
      <div className='col-xl-8 mb-5 '>
        <CompanyInfoCard company={data} loading={loading} error={error} />
      </div>
      <div className='col-xl-4 mb-5 '>
        <CompanyActivateCard branches={branchList} activeBranchCode={activeCode} loading={loading} />
      </div>
    </div>
  )
}

export default CompanyOverview
