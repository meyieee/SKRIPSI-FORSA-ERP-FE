export type CostSummary = {
  manhours?: number | string
  material?: number | string
  auxiliary?: number | string
  other?: number | string
  total?: number | string // opsional; jika tidak ada akan dihitung otomatis
}

export const costSummaryDummy: Record<string, CostSummary> = {
  DD001: {
    manhours: 600_000,
    material: 1_250_000,
    auxiliary: 0,
    other: 100_000,
  },
}
