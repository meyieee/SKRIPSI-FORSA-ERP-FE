export type AssetRow = {
  no: number
  assetNo: string
  assetDescription: string
  assetType: string
  model: string
  serialNo: string
  manufacture: string
  condition: string
}

export const assetDummy: Record<string, AssetRow[]> = {
  // Eduard
  '254875': [
    {
      no: 1,
      assetNo: 'LAP001',
      assetDescription: 'Laptop',
      assetType: 'Computer Hardware',
      model: 'LPModelA',
      serialNo: 'X12345',
      manufacture: 'ManufA',
      condition: 'Good',
    },
    {
      no: 2,
      assetNo: 'PC003',
      assetDescription: 'Personal Computer',
      assetType: 'Computer Hardware',
      model: 'PCModelZ',
      serialNo: 'X75640',
      manufacture: 'ManufB',
      condition: 'Good',
    },
    {
      no: 3,
      assetNo: 'PRN010',
      assetDescription: 'Printer',
      assetType: 'Computer Hardware',
      model: 'PRINTXXX',
      serialNo: 'PXT250',
      manufacture: 'ManufC',
      condition: 'Good',
    },
    {
      no: 4,
      assetNo: 'PHN001',
      assetDescription: 'Mobile Phone',
      assetType: 'Communication',
      model: 'MOBX23',
      serialNo: 'Z007',
      manufacture: 'ManufD',
      condition: 'Good',
    },
  ],

  // Maria
  '987654': [
    {
      no: 1,
      assetNo: 'TAB002',
      assetDescription: 'Tablet',
      assetType: 'Communication',
      model: 'TB12',
      serialNo: 'A1002',
      manufacture: 'ManufE',
      condition: 'Good',
    },
  ],
}
