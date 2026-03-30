export default function generateCode(label: string, id: number | string) {
  function getTwoDigitYear(): string {
    const year = new Date().getFullYear().toString();
    return year.slice(-2);
  }

  function getTwoDigitMonth(): string {
    const month = (new Date().getMonth() + 1).toString();
    return month.length === 1 ? `0${month}` : month;
  }

  const year = getTwoDigitYear();
  const month = getTwoDigitMonth();

  let newCode = `${label}${year}${month}-${id}`

  return newCode
}