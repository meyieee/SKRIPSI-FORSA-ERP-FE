export type AssetFinance = {
  purchaseInfo: {
    capexNo?: string
    poNo?: string
    supplier?: string
    qty?: string
    purchasePrice?: string
    purchaseDate?: string
    dateReceived?: string
  }
  accountingInfo: {
    expectedLife?: string
    depreciationYear?: string
    depreciationType?: string
    currentValue?: string
    remainValue?: string
    addValue?: string
    soldAmount?: string
    dateSold?: string
    disposalDate?: string
    disposalReason?: string
    insuranceNo?: string
  }
}

export const financeDummy: Record<string, AssetFinance> = {
  DD001: {
    purchaseInfo: {
      capexNo: 'CAP-2024-001',
      poNo: 'PO-230421',
      supplier: 'PT Nusantara Drill',
      qty: '1 unit',
      purchasePrice: 'Rp 1.250.000.000',
      purchaseDate: '01 Apr 2024',
      dateReceived: '15 Apr 2024',
    },
    accountingInfo: {
      expectedLife: '7 years',
      depreciationYear: '2024',
      depreciationType: 'Straight Line',
      currentValue: 'Rp 1.100.000.000',
      remainValue: 'Rp 950.000.000',
      addValue: 'Rp 50.000.000',
      soldAmount: '-',
      dateSold: '-',
      disposalDate: '-',
      disposalReason: '-',
      insuranceNo: 'INS-2024-7788',
    },
  },
}
