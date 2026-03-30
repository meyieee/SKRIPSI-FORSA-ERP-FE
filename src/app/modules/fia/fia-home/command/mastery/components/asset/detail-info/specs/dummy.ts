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
  D1001: {
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

export type AssetSpecs = {
  dimension: {
    height?: string
    width?: string
    depth?: string
    netWeight?: string
    grossWeight?: string
  }
  vehicleInfo: {
    initialReading?: string
    readingType?: string
    body?: string
    seatingCapacity?: string
    engineType?: string
    engineSize?: string
    chassis?: string
    cylinders?: string
    transmission?: string
  }
  computer: {
    processor?: string
    ram?: string
    systemType?: string
    os?: string
  }
  tyre: {
    size?: string
    amount?: string
    axles?: string
  }
  fuel: {
    primaryType?: string
    primaryCapacity?: string
    secondaryType?: string
    secondaryCapacity?: string
    tankUnits?: string
  }
}

export const specsDummy: Record<string, AssetSpecs> = {
  DD001: {
    dimension: {
      height: '2.8 m',
      width: '1.9 m',
      depth: '5.2 m',
      netWeight: '3,500 kg',
      grossWeight: '4,100 kg',
    },
    vehicleInfo: {
      initialReading: '0000 Hrs',
      readingType: 'Hours',
      body: 'Crawler Drill',
      seatingCapacity: '2',
      engineType: 'Diesel',
      engineSize: '3.0 L',
      chassis: 'DD-CH-2404',
      cylinders: '6',
      transmission: 'Automatic',
    },
    computer: {
      processor: 'Intel® Core™ i5',
      ram: '8 GB',
      systemType: '64-bit',
      os: 'Windows 10',
    },
    tyre: {
      size: '10R20',
      amount: '6',
      axles: '3',
    },
    fuel: {
      primaryType: 'Diesel',
      primaryCapacity: '120 L',
      secondaryType: 'DEF',
      secondaryCapacity: '20 L',
      tankUnits: 'L',
    },
  },
}
