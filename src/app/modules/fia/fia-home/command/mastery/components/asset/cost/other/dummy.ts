export type OtherRow = {
  no: number | string
  overheadCode: string
  overheadDescription: string
  quantity: number | string
  cost: number | string
  total?: number | string
}

export const otherDummy: Record<string, OtherRow[]> = {
  DD001: [
    {
      no: 1,
      overheadCode: 'OH001',
      overheadDescription: 'Service Cost',
      quantity: 2,
      cost: 250,
      total: 500,
    },
    {
      no: 2,
      overheadCode: 'OH002',
      overheadDescription: 'Support Costs',
      quantity: 1,
      cost: 500,
      total: 500,
    },
  ],
}
