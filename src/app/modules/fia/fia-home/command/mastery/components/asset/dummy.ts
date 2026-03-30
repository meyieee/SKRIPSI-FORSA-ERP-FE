export type AssetRow = {
  no: number
  assetNo: string
  assetType: string
  manufacturer: string
  model: string
  serialNo: string
  year: string | number
  location: string
  siteBranch?: string
  sectionCc?: string
  department?: string
  photo_key?: string
}

export type AssetGroup = {
  groupName: string
  department?: string
  rows: AssetRow[]
}

export const assetPhotoMap: Record<string, string> = {
  dd_z01: '/media/stock/600x400/img-1.jpg',
  exc_aaa: '/media/stock/600x400/img-2.jpg',
  exc_bbb: '/media/stock/600x400/img-3.jpg',
  ht_007: '/media/stock/600x400/img-4.jpg',
  ht_008: '/media/stock/600x400/img-5.jpg',
  __default: '/media/avatars/blank.png',
}
export const getAssetPhotoUrl = (key?: string) =>
  assetPhotoMap[key ?? ''] || assetPhotoMap.__default

export const assetTableDummy: AssetGroup[] = [
  {
    groupName: 'Diesel Drill Model DD-Z01',
    department: 'Operation Department',
    rows: [
      {
        no: 1,
        assetNo: 'DD001',
        assetType: '20202-Production Drill',
        manufacturer: 'Manufacture A',
        model: 'Model D-Z01',
        serialNo: 'D12345',
        year: 2023,
        location: 'Surface',
        siteBranch: 'Site A',
        sectionCc: 'CC-01',
        photo_key: 'dd_z01',
      },
      {
        no: 2,
        assetNo: 'DD002',
        assetType: '20202-Production Drill',
        manufacturer: 'Manufacture A',
        model: 'Model D-Z01',
        serialNo: 'D12346',
        year: 2024,
        location: 'Lime Quarry',
        siteBranch: 'Site B',
        sectionCc: 'CC-02',
        photo_key: 'dd_z01',
      },
    ],
  },
  {
    groupName: 'Excavator EXC-AAA',
    department: 'Operation Department',
    rows: [
      {
        no: 1,
        assetNo: 'EXA001',
        assetType: '20301-Excavators',
        manufacturer: 'Manufacture B',
        model: 'Model EXC-AAA',
        serialNo: 'E12345',
        year: 2022,
        location: 'Surface',
        siteBranch: 'Site A',
        sectionCc: 'CC-03',
        photo_key: 'exc_aaa',
      },
      {
        no: 2,
        assetNo: 'EXA002',
        assetType: '20301-Excavators',
        manufacturer: 'Manufacture B',
        model: 'Model EXC-AAA',
        serialNo: 'E12346',
        year: 2022,
        location: 'Surface',
        siteBranch: 'Site A',
        sectionCc: 'CC-03',
        photo_key: 'exc_aaa',
      },
    ],
  },
  {
    groupName: 'Excavator EXC-BBB',
    department: 'Maintenance Department',
    rows: [
      {
        no: 1,
        assetNo: 'EXB001',
        assetType: '20301-Excavators',
        manufacturer: 'Manufacture C',
        model: 'Model EXC-BBB',
        serialNo: 'EB1234',
        year: 2023,
        location: 'Lime Quarry',
        siteBranch: 'Site C',
        sectionCc: 'CC-04',
      },
    ],
  },
  {
    groupName: 'Haul Truck HT-007',
    department: 'Operation Department',
    rows: [
      {
        no: 1,
        assetNo: 'HL001',
        assetType: '20401-Haul Trucks',
        manufacturer: 'Manufacture D',
        model: 'Model HT007',
        serialNo: 'HT1234',
        year: 2022,
        location: 'Surface',
        siteBranch: 'Site A',
        sectionCc: 'CC-05',
      },
      {
        no: 2,
        assetNo: 'HL002',
        assetType: '20401-Haul Trucks',
        manufacturer: 'Manufacture D',
        model: 'Model HT007',
        serialNo: 'HT1235',
        year: 2022,
        location: 'Surface',
        siteBranch: 'Site A',
        sectionCc: 'CC-05',
      },
    ],
  },
  {
    groupName: 'Haul Truck HTZ08',
    department: 'Maintenance Department',
    rows: [
      {
        no: 1,
        assetNo: 'HL003',
        assetType: '20401-Haul Trucks',
        manufacturer: 'Manufacture D',
        model: 'Model HT008',
        serialNo: 'HTZ123',
        year: 2024,
        location: 'Surface',
        siteBranch: 'Site B',
        sectionCc: 'CC-06',
      },
      {
        no: 2,
        assetNo: 'HL004',
        assetType: '20401-Haul Trucks',
        manufacturer: 'Manufacture D',
        model: 'Model HT008',
        serialNo: 'HTZ124',
        year: 2025,
        location: 'Lime Quarry',
        siteBranch: 'Site C',
        sectionCc: 'CC-06',
      },
    ],
  },
]

/* Logic pencarian */
export type AssetIndexedRow = AssetRow & {groupName: string}

/** List aset yang sudah dipipihkan dan diberi groupName (serta department fallback). */
export const assetListDummy: AssetIndexedRow[] = assetTableDummy.flatMap((g) =>
  g.rows.map((r) => ({
    ...r,
    department: r.department ?? g.department,
    groupName: g.groupName,
  }))
)

/** Cari satu aset (partial match) berdasar Asset No / Model / Serial (case-insensitive). */
export function findAsset(keyword: string): AssetIndexedRow | null {
  const key = keyword.trim().toLowerCase()
  if (!key) return null

  // normalisasi untuk kasus input berisi huruf/angka campur
  const onlyAlnum = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/gi, '')

  return (
    assetListDummy.find((a) => {
      const assetNoAlpha = onlyAlnum(a.assetNo || '')
      const serialAlpha = onlyAlnum(a.serialNo || '')
      const keyAlpha = onlyAlnum(key)

      const assetNoDigits = String(a.assetNo || '').replace(/\D/g, '')
      const serialDigits = String(a.serialNo || '').replace(/\D/g, '')
      const keyDigits = key.replace(/\D/g, '')

      const byModel = (a.model || '').toLowerCase().includes(key)
      const byMfg = (a.manufacturer || '').toLowerCase().includes(key)

      // jika input ada huruf → pakai alpha compare; kalau pure angka → pakai digit compare
      const byAssetNo = keyDigits
        ? assetNoDigits.includes(keyDigits)
        : assetNoAlpha.includes(keyAlpha)
      const bySerial = keyDigits ? serialDigits.includes(keyDigits) : serialAlpha.includes(keyAlpha)

      return byAssetNo || bySerial || byModel || byMfg
    }) ?? null
  )
}

/** Cari banyak aset untuk autocomplete/suggestions. */
export function findAssets(keyword: string, limit = 10): AssetIndexedRow[] {
  const key = keyword.trim().toLowerCase()
  if (!key) return []
  const res = assetListDummy.filter(
    (a) =>
      a.assetNo?.toLowerCase().includes(key) ||
      a.model?.toLowerCase().includes(key) ||
      a.serialNo?.toLowerCase().includes(key) ||
      a.manufacturer?.toLowerCase().includes(key)
  )
  return res.slice(0, limit)
}

/** Ambil aset berdasarkan Asset No (exact match, case-insensitive). */
export function getAssetByNo(assetNo: string): AssetIndexedRow | undefined {
  const k = assetNo.trim().toLowerCase()
  return assetListDummy.find((a) => a.assetNo?.toLowerCase() === k)
}
