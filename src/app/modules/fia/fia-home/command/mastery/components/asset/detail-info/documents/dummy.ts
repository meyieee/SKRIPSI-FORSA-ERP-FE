export type AssetDocument = {
  fileCode: string
  fileName: string
  fileType: 'pdf' | 'word' | 'excel' | 'image' | 'other'
  description?: string
  size?: string
  uploadedAt?: string
  uploadedBy?: string
  url?: string
}

export const documentsDummy: Record<string, AssetDocument[]> = {
  DD001: [
    {
      fileCode: 'DOC-001',
      fileName: 'Operation Manual',
      fileType: 'pdf',
      description: 'Manual operasi unit (scan PDF).',
      size: '2.4 MB',
      uploadedAt: '01-Apr-24',
      uploadedBy: 'Tony',
      url: '#',
    },
    {
      fileCode: 'DOC-002',
      fileName: 'Inspection Report',
      fileType: 'word',
      description: 'Laporan inspeksi berkala.',
      size: '560 KB',
      uploadedAt: '15-Apr-24',
      uploadedBy: 'Sesca',
      url: '#',
    },
    {
      fileCode: 'DOC-003',
      fileName: 'Spare Parts List',
      fileType: 'excel',
      description: 'Daftar parts & kode.',
      size: '180 KB',
      uploadedAt: '22-Apr-24',
      uploadedBy: 'Maria',
      url: '#',
    },
    {
      fileCode: 'DOC-004',
      fileName: 'Warranty Card',
      fileType: 'image',
      description: 'Foto kartu garansi.',
      size: '320 KB',
      uploadedAt: '22-Apr-24',
      uploadedBy: 'Maria',
      url: '#',
    },
  ],
}
