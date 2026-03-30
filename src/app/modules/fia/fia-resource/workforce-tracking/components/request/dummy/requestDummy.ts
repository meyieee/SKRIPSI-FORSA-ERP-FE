// ../dummy/workforceRequestDummy.ts

export type EmploymentType = 'Temporary' | 'Permanent' | 'Part-time' | 'Contract' | string

export type RequestStatus = 'New Request' | 'Waiting Approval' | string

export type WorkforceRequest = {
  no: number
  requestNo: string
  jobPosition: string
  requestDate: string
  numberOfPosition: number
  employmentType: EmploymentType
  workLocation: string
  status: RequestStatus
  actionCode: string // contoh: "V|U" atau "V|E|D"
}

export type WorkforceRequestWorkgroup = {
  code: string
  name: string
  requests: WorkforceRequest[]
}

export type WorkforceRequestBlock = {
  departmentCode: string
  department: string
  siteBranch: string
  section?: string
  element?: string
  workgroups: WorkforceRequestWorkgroup[]
}

export const workforceRequestBlocks: WorkforceRequestBlock[] = [
  {
    departmentCode: '1101',
    department: 'Operation Department',
    siteBranch: 'Head Site A',
    section: 'Operation',
    workgroups: [
      {
        code: 'OP-HL',
        name: 'Operation Hauling Workgroup',
        requests: [
          {
            no: 1,
            requestNo: 'WR2506-010',
            jobPosition: 'Haul Supervisor',
            requestDate: '09-Mar-25',
            numberOfPosition: 1,
            employmentType: 'Temporary',
            workLocation: 'Surface Mine',
            status: 'New Request',
            actionCode: 'V|U',
          },
          {
            no: 2,
            requestNo: 'WR2506-011',
            jobPosition: 'Hauling Superintendent',
            requestDate: '09-Mar-25',
            numberOfPosition: 1,
            employmentType: 'Permanent',
            workLocation: 'Surface Mine',
            status: 'New Request',
            actionCode: 'V|U',
          },
          {
            no: 3,
            requestNo: 'WR2505-012',
            jobPosition: 'Operator',
            requestDate: '04-May-25',
            numberOfPosition: 3,
            employmentType: 'Part-time',
            workLocation: 'Surface Mine',
            status: 'Waiting Approval',
            actionCode: 'V|U',
          },
        ],
      },
    ],
  },
  {
    departmentCode: '2101',
    department: 'Human Resource Department',
    siteBranch: 'Head Site A',
    section: 'HR',
    workgroups: [
      {
        code: 'HR-ADM',
        name: 'Employee Admin Workgroup',
        requests: [
          {
            no: 1,
            requestNo: 'WR2504-013',
            jobPosition: 'Human Rerource Officer',
            requestDate: '04-Apr-25',
            numberOfPosition: 1,
            employmentType: 'Contract',
            workLocation: 'Main Office Building',
            status: 'Waiting Approval',
            actionCode: 'V|E|D',
          },
          {
            no: 2,
            requestNo: 'WR2504-014',
            jobPosition: 'Human Rerource Superintendent',
            requestDate: '09-Apr-25',
            numberOfPosition: 1,
            employmentType: 'Permanent',
            workLocation: 'Main Office Building',
            status: 'Waiting Approval',
            actionCode: 'V|E|D',
          },
        ],
      },
    ],
  },
]
