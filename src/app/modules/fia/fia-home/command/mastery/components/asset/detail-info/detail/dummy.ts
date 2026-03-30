export type AssetDetail = {
  assetRefNo: string
  manufactureNo: string
  manufactureYear: string | number
  dateOperate: string
  userPIC: string
  ownership: string

  branchSite: string
  department: string
  costCenter: string
  accountCode: string
  location: string
  ownershipType: string

  condition: string
  registerBy: string
  registerDate: string
  qrImageUrl?: string
}

export const detailDummy: Record<string, AssetDetail> = {
  DD001: {
    assetRefNo: 'D1001',
    manufactureNo: 'XX123',
    manufactureYear: 2024,
    dateOperate: '15 April 2024',
    userPIC: 'Sesca Sweet Heart - 2305-016',
    ownership: 'Abase',

    branchSite: 'Jakarta',
    department: 'Operation',
    costCenter: 'Operation',
    accountCode: 'Operation Costs',
    location: 'Jakarta',
    ownershipType: 'Owner | Rental',

    condition: 'Good',
    registerBy: 'Tony Crown - 2305-022',
    registerDate: '01 Apr 24',
  },
}
