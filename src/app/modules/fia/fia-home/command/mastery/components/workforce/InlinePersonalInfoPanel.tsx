// Workforce/InlinePersonalInfoPanel.tsx
import React, {useMemo, useState} from 'react'
import {GeneralInfo} from '../../../../../fia-resource/personal-info/components/GeneralInfo'
import {useProfile} from '../../../../../fia-resource/personal-info/components/ProfileContext'

/* Imports */
import {
  PersonalDataTab,
  JobInfoTab,
  JobServiceTab,
  DependentTab,
  KINTab,
} from '../../../../../fia-resource/personal-info/components/main-tabs/SubTabs'

/* More Detail Sub-components */
import {
  CareerTab,
  TrainingTab,
  EducationTab,
  LanguageHobbyTab,
  AppraisalTab,
} from '../../../../../fia-resource/personal-info/components/more-detail/career-development/SubTabs'

import {
  DisciplineTab,
  WarningTab,
} from '../../../../../fia-resource/personal-info/components/more-detail/violation-discipline/SubTabs'

import {
  LeaveTravelTab,
  ExpenseClaimTab,
  EarningsTab,
  MedicalTab,
  LoanTab,
  AssetTab,
  PpeTab,
} from '../../../../../fia-resource/personal-info/components/more-detail/compensation-benefit/SubTabs'

import {
  ContractTab,
  EFilingTab,
} from '../../../../../fia-resource/personal-info/components/more-detail/documents/SubTabs'

/* Tipe & Config  */
type Main = 'personal' | 'career' | 'violation' | 'compensation' | 'documents'
type SubConf = {key: string; label: string; Comp: React.ComponentType}

const SUB_TABS: Record<Main, SubConf[]> = {
  personal: [
    {key: 'personal_data', label: 'Personal Data', Comp: PersonalDataTab},
    {key: 'job_info', label: 'Job Info', Comp: JobInfoTab},
    {key: 'job_service', label: 'Job Service', Comp: JobServiceTab},
    {key: 'dependent', label: 'Dependent', Comp: DependentTab},
    {key: 'kin', label: 'KIN', Comp: KINTab},
  ],
  career: [
    {key: 'career', label: 'Career', Comp: CareerTab},
    {key: 'training', label: 'Training', Comp: TrainingTab},
    {key: 'education', label: 'Education', Comp: EducationTab},
    {key: 'language_hobby', label: 'Language & Hobby', Comp: LanguageHobbyTab},
    {key: 'appraisal', label: 'Appraisal', Comp: AppraisalTab},
  ],
  violation: [
    {key: 'discipline', label: 'Discipline', Comp: DisciplineTab},
    {key: 'warning', label: 'Warning', Comp: WarningTab},
  ],
  compensation: [
    {key: 'leave_travel', label: 'Leave & Travel', Comp: LeaveTravelTab},
    {key: 'expense_claim', label: 'Expense Claim', Comp: ExpenseClaimTab},
    {key: 'earnings', label: 'Earnings', Comp: EarningsTab},
    {key: 'medical', label: 'Medical', Comp: MedicalTab},
    {key: 'loan', label: 'Loan', Comp: LoanTab},
    {key: 'asset', label: 'Asset', Comp: AssetTab},
    {key: 'ppe', label: 'PPE', Comp: PpeTab},
  ],
  documents: [
    {key: 'efiling', label: 'E-Filing', Comp: EFilingTab},
    {key: 'employment_contract', label: 'Employment Contract', Comp: ContractTab},
  ],
}

const MAIN_TABS: {key: Main; label: string}[] = [
  {key: 'personal', label: 'GENERAL INFO'},
  {key: 'career', label: 'CAREER & DEVELOPMENT'},
  {key: 'violation', label: 'VIOLATION & DISCIPLINE'},
  {key: 'compensation', label: 'COMPENSATION & BENEFIT'},
  {key: 'documents', label: 'DOCUMENTS'},
]

const InlinePersonalInfoPanel: React.FC = () => {
  const {selectedId} = useProfile()
  const [main, setMain] = useState<Main>('personal')
  const [sub, setSub] = useState<string>(SUB_TABS.personal[0].key)

  // reset sub-tab saat main berubah
  const subs = SUB_TABS[main]
  const activeSub = useMemo(() => subs.find((s) => s.key === sub) ?? subs[0], [subs, sub])
  const ActiveComp = activeSub.Comp

  // kalau belum ada id terpilih, jangan render
  if (!selectedId) return null
  return (
    <div className='mt-6'>
      {/* Header  */}
      <GeneralInfo showMainNav={false} />

      {/* Main Tabs Lokal  */}
      <div className='ms-3 mb-3'>
        <ul className='nav nav-tabs nav-line-tabs nav-stretch fs-5 border-0'>
          {MAIN_TABS.map((t) => (
            <li key={t.key} className='nav-item me-3'>
              <button
                type='button'
                className={`nav-link ${
                  main === t.key ? 'active text-primary fw-bold' : 'text-muted'
                }`}
                onClick={() => {
                  setMain(t.key)
                  setSub(SUB_TABS[t.key][0].key)
                }}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='card'>
        {/* Sub Tabs */}
        <div className='card bg-secondary'>
          <ul className=' nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 ms-5 mt-2 mb-2 gap-2'>
            {subs.map((s) => (
              <li key={s.key} className='nav-item'>
                <button
                  type='button'
                  className={`nav-link ${
                    activeSub.key === s.key ? 'active text-primary fw-bold' : 'text-muted'
                  }`}
                  onClick={() => setSub(s.key)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Konten */}
        <div>
          {ActiveComp ? (
            <ActiveComp key={`content-${main}-${sub}-${selectedId}`} />
          ) : (
            <div className='alert alert-danger'>
              Component not found for "{activeSub.key}". Cek export/import SubTabs.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InlinePersonalInfoPanel
