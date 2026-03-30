import { HotlineContact, InChargePerson, HelpdeskRequest } from '../core/types'

export const mockHotlineContacts: HotlineContact[] = [
  {
    type: 'phone',
    label: 'HOTLINE PHONE',
    values: ['977', '0431-XXXXXX'],
  },
  {
    type: 'wa',
    label: 'WA | Radio',
    values: ['0811-XXXXXX', '1234'],
  },
  {
    type: 'email',
    label: 'Email',
    values: ['hotline@forsa.com'],
  },
]

export const mockInChargePersons: InChargePerson[] = [
  {
    fullName: 'Martina Don',
    jobTitle: 'CM Supervisor',
    phone: '0811-xxxxxxxx',
  },
  {
    fullName: 'Amrit Have',
    jobTitle: 'CM Operator',
    phone: '0811-xxxxxxxx',
  },
  {
    fullName: 'Fransico Ola',
    jobTitle: 'HelpDesk Officer',
    phone: '0811-xxxxxxxx',
  },
  {
    fullName: 'John Rod',
    jobTitle: 'CM Supervisor',
    phone: '0811-xxxxxxxx',
  },
  {
    fullName: 'Luci Ramos',
    jobTitle: 'CM Operator',
    phone: '0811-xxxxxxxx',
  },
]

export const mockHelpdeskRequests: HelpdeskRequest[] = [
  {
    id: '1',
    refDocNo: 'PO2306-001',
    description: 'Purchase Laptop and accessories',
    transType: 'Purchase Order',
    requestor: 'Obi Kobe',
    priority: 'P#2',
    requestDate: '10-Jun-23',
    expired: '2 Days',
    status: 'Waiting Approval',
  },
  {
    id: '2',
    refDocNo: 'PO2306-002',
    description: 'Purchase Office Furniture and Refrigerator',
    transType: 'Purchase Order',
    requestor: 'Atlas Lala',
    priority: 'P#2',
    requestDate: '20-Jun-23',
    expired: '10 Days',
    status: 'Waiting Approval',
  },
  {
    id: '3',
    refDocNo: 'WO2307-001',
    description: 'Replace New Alternator',
    transType: 'Workorder',
    requestor: 'Muffin Stone',
    priority: 'P#2',
    requestDate: '02-Jul-23',
    expired: '2 Days',
    status: 'Waiting Approval',
  },
  {
    id: '4',
    refDocNo: 'TR2307-001',
    description: 'Travel Request - Atlas Kobe',
    transType: 'Travel Request',
    requestor: 'Lala Apin',
    priority: 'P#2',
    requestDate: '05-Jul-23',
    expired: '5 Days',
    status: 'Waiting Approval',
  },
  {
    id: '5',
    refDocNo: 'MR2307-001',
    description: 'Material Request for New Alternator',
    transType: 'Material Request',
    requestor: 'Val Lala',
    priority: 'P#2',
    requestDate: '15-Jul-23',
    expired: '5 Days',
    status: 'Waiting Approval',
  },
]














