export type LanguageRow = {
  no: number
  language: string
  speaking: string
  reading: string
  writing: string
  listening: string
  remarks: string
}

export type HobbyRow = {
  no: number
  hobby: string
  remarks: string
}

export const languageDummy: Record<string, LanguageRow[]> = {
  // Eduard (254875)
  '254875': [
    {
      no: 1,
      language: 'English',
      speaking: 'Good',
      reading: 'Good',
      writing: 'Good',
      listening: 'Good',
      remarks: '',
    },
    {
      no: 2,
      language: 'Indonesia',
      speaking: 'Excellent',
      reading: 'Excellent',
      writing: 'Excellent',
      listening: 'Excellent',
      remarks: '',
    },
    {
      no: 3,
      language: 'Sanger',
      speaking: 'Excellent',
      reading: 'Excellent',
      writing: 'Excellent',
      listening: 'Excellent',
      remarks: '',
    },
  ],
  // Maria (987654)
  '987654': [
    {
      no: 1,
      language: 'Indonesia',
      speaking: 'Excellent',
      reading: 'Excellent',
      writing: 'Excellent',
      listening: 'Excellent',
      remarks: '',
    },
    {
      no: 2,
      language: 'English',
      speaking: 'Good',
      reading: 'Good',
      writing: 'Good',
      listening: 'Good',
      remarks: '',
    },
  ],
}

export const hobbyDummy: Record<string, HobbyRow[]> = {
  // Eduard (254875)
  '254875': [
    {no: 1, hobby: 'Computer', remarks: ''},
    {no: 2, hobby: 'Football', remarks: ''},
    {no: 3, hobby: 'Travelling', remarks: ''},
  ],
  // Maria (987654)
  '987654': [
    {no: 1, hobby: 'Reading', remarks: ''},
    {no: 2, hobby: 'Hiking', remarks: ''},
  ],
}
