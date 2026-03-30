export default function realDateFormatValue(str:any) {

  let splitString = str?.split("");

  let reverseArray = splitString?.reverse()?.reverse();

  let joinArray = reverseArray?.join("")?.replace(/[^0-9]/g,'-');

  return joinArray;
}
