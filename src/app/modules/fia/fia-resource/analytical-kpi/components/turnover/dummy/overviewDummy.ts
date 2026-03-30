// src/app/.../dummy/turnoverDummy.ts

export type TurnoverRow = {
  no: number
  month: string
  opening: number
  hire: number
  left: number
  closing: number
  rate: string
}

export const turnoverRows: TurnoverRow[] = [
  {no: 1, month: 'January', opening: 58, hire: 5, left: 2, closing: 61, rate: '3.28%'},
  {no: 2, month: 'February', opening: 58, hire: 0, left: 0, closing: 58, rate: '0.00%'},
  {no: 3, month: 'March', opening: 55, hire: 4, left: 0, closing: 59, rate: '0.00%'},
  {no: 4, month: 'April', opening: 56, hire: 0, left: 2, closing: 54, rate: '3.70%'},
  {no: 5, month: 'May', opening: 56, hire: 1, left: 0, closing: 57, rate: '0.00%'},
  {no: 6, month: 'June', opening: 57, hire: 0, left: 0, closing: 57, rate: '0.00%'},
  {no: 7, month: 'July', opening: 54, hire: 0, left: 0, closing: 54, rate: '0.00%'},
  {no: 8, month: 'August', opening: 54, hire: 1, left: 0, closing: 55, rate: '0.00%'},
  {no: 9, month: 'September', opening: 57, hire: 1, left: 0, closing: 58, rate: '0.00%'},
  {no: 10, month: 'October', opening: 57, hire: 0, left: 1, closing: 56, rate: '1.79%'},
  {no: 11, month: 'November', opening: 57, hire: 0, left: 1, closing: 56, rate: '1.79%'},
  {no: 12, month: 'December', opening: 57, hire: 0, left: 0, closing: 56, rate: '0.89%'},
]
