export type MedicalRow = {
  no: number
  requestNo: string
  clinicName: string
  dateRequest: string
  symptom: string
  diagnosa: string
  medicalCharges: number
}

export const medicalDummy: Record<string, MedicalRow[]> = {
  // Eduard (254875) — sesuai foto
  '254875': [
    {
      no: 1,
      requestNo: '2301-001',
      clinicName: 'Clinic ABC',
      dateRequest: '1 Jan 23',
      symptom: '',
      diagnosa: '',
      medicalCharges: 15000000,
    },
    {
      no: 2,
      requestNo: '2301-002',
      clinicName: 'Clinic ABC',
      dateRequest: '4 Feb 23',
      symptom: '',
      diagnosa: '',
      medicalCharges: 15000000,
    },
    {
      no: 3,
      requestNo: '2301-003',
      clinicName: 'Clinic ABC',
      dateRequest: '31 Feb 23',
      symptom: '',
      diagnosa: '',
      medicalCharges: 7500000,
    },
    {
      no: 4,
      requestNo: '2301-004',
      clinicName: 'Clinic ABC',
      dateRequest: '1 Mar 23',
      symptom: '',
      diagnosa: '',
      medicalCharges: 15000000,
    },
  ],

  // Maria (987654) — contoh tambahan
  '987654': [
    {
      no: 1,
      requestNo: '2306-001',
      clinicName: 'Clinic XYZ',
      dateRequest: '10 Jun 23',
      symptom: 'Fever',
      diagnosa: 'Viral infection',
      medicalCharges: 9000000,
    },
  ],
}
