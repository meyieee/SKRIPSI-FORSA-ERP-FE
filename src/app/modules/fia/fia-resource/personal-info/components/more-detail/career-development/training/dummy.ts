// tipe data untuk baris training
export type TrainingRow = {
  no: number
  courseType: string
  courseName: string
  start: string // pakai string biar tampil persis seperti foto (dd-MMM-yy)
  end: string
  institution: string
  result: string
}

export const trainingDummy: Record<string, TrainingRow[]> = {
  // Eduard (254875) — sesuai foto
  '254875': [
    {
      no: 1,
      courseType: 'MTP419',
      courseName: 'Proj. Management Workshop',
      start: '24-Feb-97',
      end: '24-Feb-97',
      institution: 'Institution',
      result: '75',
    },
    {
      no: 2,
      courseType: 'License',
      courseName: 'Light Vehicle Testing',
      start: '11-Mar-04',
      end: '11-Mar-04',
      institution: 'QMS (quality management system) inhouse training',
      result: 'C',
    },
    {
      no: 3,
      courseType: 'QPA4',
      courseName: 'Light Vehicle_Testing',
      start: '11-Mar-04',
      end: '11-Mar-04',
      institution: 'Freeport Training',
      result: 'C',
    },
    {
      no: 4,
      courseType: 'FT304',
      courseName: 'Safety Induction Surface Mine',
      start: '11-Aug-04',
      end: '11-Aug-04',
      institution: 'QMS (quality management system) inhouse training',
      result: 'C',
    },
    {
      no: 5,
      courseType: 'SFT304',
      courseName: 'Safety Induction Surface Mine',
      start: '11-Aug-04',
      end: '11-Aug-04',
      institution: 'Freeport Safety',
      result: 'C',
    },
    {
      no: 6,
      courseType: 'QPA4',
      courseName: 'Light Vehicle_Testing',
      start: '25-Aug-04',
      end: '25-Aug-04',
      institution: 'QMS (quality management system) inhouse training',
      result: 'C',
    },
  ],

  // Maria (987654)
  '987654': [
    {
      no: 1,
      courseType: 'HR101',
      courseName: 'Employment Law Basics',
      start: '02-Jan-22',
      end: '03-Jan-22',
      institution: 'Contoso Learning',
      result: 'A',
    },
    {
      no: 2,
      courseType: 'HR205',
      courseName: 'Compensation Essentials',
      start: '15-Feb-23',
      end: '15-Feb-23',
      institution: 'Fabrikam Institute',
      result: 'B+',
    },
  ],
}
