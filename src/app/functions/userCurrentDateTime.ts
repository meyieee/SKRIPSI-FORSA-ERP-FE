export const userCurrentDateTime = (datetime: string) => {
  // code ini jika variable menggunakan input field type='datetime-local'
  const d = new Date();
  let differetInMinutes = d.getTimezoneOffset();
  const result = new Date(datetime).setMinutes( differetInMinutes < 0 ? new Date(datetime).getMinutes() + (Math.abs(differetInMinutes)) : new Date(datetime).getMinutes() - (Math.abs(differetInMinutes)));
  return result
}