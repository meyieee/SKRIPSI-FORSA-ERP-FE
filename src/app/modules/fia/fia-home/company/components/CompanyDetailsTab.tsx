import { Company } from '../core/_models'
import { DetailsTab, ContactsTab, DocumentsTab, ContractTab } from './company-details-tabs'

interface CompanyDetailsTabProps {
  company: Company
  activeTab: string
}

export const CompanyDetailsTab = ({ company, activeTab }: CompanyDetailsTabProps) => {
  if (!company) return null

  switch (activeTab) {
    case 'details':
      return <DetailsTab company={company} />
    case 'contacts':
      return <ContactsTab company={company} />
    case 'documents':
      return <DocumentsTab company={company} />
    case 'contract':
      return <ContractTab company={company} />
    default:
      return null
  }
}







